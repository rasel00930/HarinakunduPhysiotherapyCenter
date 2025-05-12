import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import AddPeopleForm from "../components/AddPeopleForm";
import OverviewSection from "../components/OverviewSection";
import PeopleList from "../components/PeopleList";
import { db } from "../firebase";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import LogoutButton from "../components/LogoutButton";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentView, setCurrentView] = useState("home");
  const [searchType, setSearchType] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [people, setPeople] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "people"), (snapshot) => {
      const peopleData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      peopleData.sort((a, b) => new Date(b.date) - new Date(a.date));
      setPeople(peopleData);
      setFiltered(peopleData);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const view = params.get("view") || "home";
    setCurrentView(view);
  }, [location.search]);

  const updateView = (view) => {
    navigate(`/dashboard?view=${view}`);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "people", id));
    const updated = people.filter((p) => p.id !== id);
    setPeople(updated);
    setFiltered(updated);
  };

  const handleSearch = () => {
    if (!searchQuery) {
      setFiltered(people);
      updateView("home");
      return;
    }

    let result = people;
    if (searchType === "name") {
      result = people.filter((p) =>
        (p.name || "").toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (searchType === "date") {
      const selected = new Date(searchQuery).toISOString().split("T")[0];
      result = people.filter((p) => {
        if (!p.date) return false;
        const personDate = new Date(p.date).toISOString().split("T")[0];
        return personDate === selected;
      });
    }

    setFiltered(result);
    updateView("home");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <div className="w-full md:w-1/6 border-r border-gray-300 bg-white">
        <Sidebar
          showTable={currentView === "home"}
          toggleTable={() => {
            setFiltered(people);
            setSearchQuery("");
            updateView("home");
          }}
        />
      </div>

      <div className="flex-1 px-4 py-6 w-full">
        {location.pathname !== "/dashboard" ? (
          <Outlet />
        ) : (
          <>
            {/* Button Group */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-6">
              <button
                onClick={() => updateView("form")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-xl shadow-md transition-all"
              >
                Add Person
              </button>

              <button
                onClick={() => updateView("search")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-xl shadow-md transition-all"
              >
                Search
              </button>

              <LogoutButton />
            </div>

            {/* Form View */}
            {currentView === "form" && (
              <div className="flex justify-center items-start">
                <AddPeopleForm />
              </div>
            )}

            {/* Search View */}
            {currentView === "search" && (
              <div className="flex flex-col lg:flex-row items-center gap-4 mb-6 justify-center">
                <div className="flex gap-4">
                  <label className="flex items-center gap-1 text-gray-700">
                    <input
                      type="radio"
                      name="searchType"
                      value="name"
                      checked={searchType === "name"}
                      onChange={(e) => setSearchType(e.target.value)}
                    />
                    Name
                  </label>
                  <label className="flex items-center gap-1 text-gray-700">
                    <input
                      type="radio"
                      name="searchType"
                      value="date"
                      checked={searchType === "date"}
                      onChange={(e) => setSearchType(e.target.value)}
                    />
                    Date
                  </label>
                </div>

                <input
                  type={searchType === "date" ? "date" : "text"}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border border-gray-300 px-3 py-2 rounded-md w-full sm:w-64"
                  placeholder={
                    searchType === "name" ? "Enter name..." : "Select date"
                  }
                />

                <button
                  onClick={handleSearch}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl shadow-md transition-all"
                >
                  Search
                </button>
              </div>
            )}

            {/* Home View */}
            {currentView === "home" && (
              <div className="mt-4">
                <OverviewSection />
                {filtered.length > 0 ? (
                  <PeopleList people={filtered} onDelete={handleDelete} />
                ) : (
                  <p className="text-center text-gray-500 mt-6">
                    No records found.
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
