import React, { useEffect, useState } from "react";
import AddDailyForm from "../components/AddDailyForm";
import DailyStatementTable from "../components/DailyStatementTable";
import DailyOverview from "../components/DailyOverview";
import { db, auth } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import dayjs from "dayjs";

const DailyStatement = () => {
  const [view, setView] = useState("history");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [historyFilter, setHistoryFilter] = useState("today");
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month()); // 0-based (January = 0)

  // Auth and Firestore data fetching
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) return;

      const q = query(
        collection(db, "dailyStatements"),
        where("ownerId", "==", user.uid)
      );

      const unsubscribeData = onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(items);
      });

      return () => unsubscribeData();
    });

    return () => unsubscribeAuth();
  }, []);

  // Filtering logic
  useEffect(() => {
    if (view === "history") {
      const today = dayjs().format("YYYY-MM-DD");

      const previousDates = data.filter((item) => {
        const itemDate = item.date
          ? dayjs(item.date).format("YYYY-MM-DD")
          : item.createdAt
          ? dayjs(item.createdAt.toDate()).format("YYYY-MM-DD")
          : null;

        return itemDate < today || itemDate > today;
      });

      const todayData = data.filter((item) => {
        const itemDate = item.date
          ? dayjs(item.date).format("YYYY-MM-DD")
          : item.createdAt
          ? dayjs(item.createdAt.toDate()).format("YYYY-MM-DD")
          : null;

        return itemDate === today;
      });

      const monthlyData = data.filter((item) => {
        const itemDate = item.date
          ? dayjs(item.date)
          : item.createdAt
          ? dayjs(item.createdAt.toDate())
          : null;

        return (
          itemDate &&
          itemDate.month() === selectedMonth &&
          itemDate.year() === dayjs().year()
        );
      });

      if (historyFilter === "today") {
        setFilteredData(todayData);
      } else if (historyFilter === "previous") {
        setFilteredData(previousDates);
      } else if (historyFilter === "monthly") {
        setFilteredData(monthlyData);
      }
    }
  }, [data, view, historyFilter, selectedMonth]);

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      {/* Top View Switch Buttons */}
      <div className="flex gap-2 justify-center mb-6">
        <button
          onClick={() => setView("add")}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Add
        </button>
        <button
          onClick={() => setView("search")}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Search
        </button>
        <button
          onClick={() => setView("history")}
          className="px-4 py-2 bg-gray-500 text-white rounded-md"
        >
          History
        </button>
      </div>

      {/* History Filter Buttons */}
      {view === "history" && (
        <>
          <div className="flex gap-2 justify-center mb-4 flex-wrap">
            <button
              onClick={() => setHistoryFilter("today")}
              className={`px-4 py-1 rounded-md ${
                historyFilter === "today"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setHistoryFilter("previous")}
              className={`px-4 py-1 rounded-md ${
                historyFilter === "previous"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Previous Day
            </button>
            <button
              onClick={() => setHistoryFilter("monthly")}
              className={`px-4 py-1 rounded-md ${
                historyFilter === "monthly"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Monthly
            </button>
          </div>

          {/* Monthly Dropdown */}
          {historyFilter === "monthly" && (
            <div className="flex justify-center mb-4">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="px-4 py-2 border rounded-md"
              >
                {Array.from({ length: 12 }).map((_, index) => (
                  <option key={index} value={index}>
                    {dayjs().month(index).format("MMMM")}
                  </option>
                ))}
              </select>
            </div>
          )}
        </>
      )}

      {/* Overview Component */}
      {view !== "add" && <DailyOverview data={filteredData} />}

      {/* Form View */}
      {view === "add" && <AddDailyForm />}

      {/* Table View */}
      {(view === "search" || view === "history") && (
        <DailyStatementTable
          mode={view}
          data={view === "history" ? filteredData : data}
          setFilteredData={setFilteredData}
        />
      )}
    </div>
  );
};

export default DailyStatement;

