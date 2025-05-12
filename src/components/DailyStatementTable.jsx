import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useMemo } from "react"; 
import { FaChevronDown } from "react-icons/fa";
import {
  
  deleteDoc,
  doc,
  
} from "firebase/firestore";
import EditForm from "./EditForm";

const DailyStatementTable = ({ mode, data, setFilteredData }) => {
  const [searchType, setSearchType] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);

  const handleSearch = () => {
    setShowResults(true);
    setVisibleCount(5);
  };

 
const filtered = useMemo(() => {
  if (mode === "search" && showResults) {
    if (searchType === "name" && searchTerm.trim() !== "") {
      return data.filter((item) =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (searchType === "date" && searchDate !== "") {
      return data.filter((item) => item.date === searchDate);
    } else {
      return [];
    }
  } else if (mode === "search") {
    return [];
  } else {
    return data;
  }
}, [mode, showResults, searchType, searchTerm, searchDate, data]);

  useEffect(() => {
    if (mode === "search") {
      setFilteredData(filtered);
    }
  }, [filtered, mode, setFilteredData]);

  const sortedData = [...filtered].sort((a, b) => {
    const aTime = a.createdAt?.seconds || 0;
    const bTime = b.createdAt?.seconds || 0;
    return bTime - aTime;
  });

  const visibleData = sortedData.slice(0, visibleCount);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      await deleteDoc(doc(db, "dailyStatements", id));
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
  };

  const handleClose = () => {
    setSelectedItem(null);
  };

  return (
    <div className="max-w-5xl mx-auto mt-6 p-4 bg-white rounded-2xl shadow-md">
      {mode === "search" && (
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-4 mb-3">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                value="name"
                checked={searchType === "name"}
                onChange={() => {
                  setSearchType("name");
                  setSearchDate("");
                  setShowResults(false);
                  setVisibleCount(5);
                }}
              />
              <span className="text-sm">Name</span>
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                value="date"
                checked={searchType === "date"}
                onChange={() => {
                  setSearchType("date");
                  setSearchTerm("");
                  setShowResults(false);
                  setVisibleCount(5);
                }}
              />
              <span className="text-sm">Date</span>
            </label>

            <div className="flex gap-2 items-center">
              {searchType === "name" ? (
                <input
                  type="text"
                  placeholder="Enter name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border rounded-md px-3 py-1 text-sm w-40"
                />
              ) : (
                <input
                  type="date"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                  className="border rounded-md px-3 py-1 text-sm w-40"
                />
              )}
              <button
                onClick={handleSearch}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md text-sm"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-300">
            <tr>
              <th className="p-3 w-32">Name</th>
              <th className="p-3 w-32">Phone</th>
              <th className="p-3 w-32">Payment</th>
              <th className="p-3 w-32">Date</th>
              <th className="p-3 w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No records found.
                </td>
              </tr>
            ) : (
              visibleData.map((item, index) => (
                <tr
                  key={item.id}
                  className={`hover:bg-gray-50 transition duration-150 ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.phone}</td>
                  <td className="p-3">{item.payment} tk</td>
                  <td className="p-3">{item.date}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      type="button"
                      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-xs px-3 py-1.5"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      type="button"
                      className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br font-medium rounded-lg text-xs px-3 py-1.5"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {visibleCount < sortedData.length && (
          <div className="text-center mt-4">
            <span
              onClick={() => setVisibleCount((prev) => prev + 1)}
              className="text-blue-600 cursor-pointer text-sm hover:underline inline-flex items-center gap-1"
            >
              View More <FaChevronDown className="text-xs" />
            </span>
          </div>
        )}
      </div>

      {selectedItem && <EditForm data={selectedItem} onClose={handleClose} />}
    </div>
  );
};

export default DailyStatementTable;
