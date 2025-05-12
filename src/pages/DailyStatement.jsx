import React, { useEffect, useState } from "react";
import AddDailyForm from "../components/AddDailyForm";
import DailyStatementTable from "../components/DailyStatementTable";
import DailyOverview from "../components/DailyOverview";
import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const DailyStatement = () => {
  const [view, setView] = useState("history");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "dailyStatements"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(items);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="flex gap-2 justify-center mb-6">
        <button onClick={() => setView("add")} className="px-4 py-2 bg-green-500 text-white rounded-md">Add</button>
        <button onClick={() => setView("search")} className="px-4 py-2 bg-blue-500 text-white rounded-md">Search</button>
        <button onClick={() => setView("history")} className="px-4 py-2 bg-gray-500 text-white rounded-md">History</button>
      </div>

      {view !== "add" && (
        <DailyOverview data={view === "history" ? data : filteredData} />
      )}

      {view === "add" && <AddDailyForm />}
      {(view === "search" || view === "history") && (
        <DailyStatementTable
          mode={view}
          data={data}
          setFilteredData={setFilteredData}
        />
      )}
    </div>
  );
};

export default DailyStatement;
