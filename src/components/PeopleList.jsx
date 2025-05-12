import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import jsPDF from "jspdf";

const PeopleList = ({ people, onDelete }) => {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    age: "",
    number: "",
    disease: "",
    description: "",
    payment: "",
    paymentReceived: "",
    date: "",
  });

  const [visibleCount, setVisibleCount] = useState(5);

  const handleEditClick = (person) => {
    setEditId(person.id);
    setEditData({ ...person });
  };

  const handleUpdate = async () => {
    const personRef = doc(db, "people", editId);
    await updateDoc(personRef, { ...editData });
    setEditId(null);
    alert("Data updated successfully!");
  };

  const handlePDFDownload = (person) => {
    const docPDF = new jsPDF();
    docPDF.text("Person Information", 20, 20);
    docPDF.text(`Name: ${person.name}`, 20, 30);
    docPDF.text(`Age: ${person.age}`, 20, 40);
    docPDF.text(`Phone: ${person.number}`, 20, 50);
    docPDF.text(`Disease: ${person.disease}`, 20, 60);
    docPDF.text(`Description: ${person.description}`, 20, 70);
    docPDF.text(`Payment: ${person.payment} tk`, 20, 80);
    docPDF.text(`Received: ${person.paymentReceived} tk`, 20, 90);
    docPDF.text(`Date: ${new Date(person.date).toLocaleDateString()}`, 20, 100);
    docPDF.save(`${person.name}_info.pdf`);
  };

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 1);
  };

  const visiblePeople = people.slice(0, visibleCount);

  if (editId) {
    return (
      <div className="bg-white p-6 rounded-lg shadow max-w-4xl mx-auto mt-6">
        <h2 className="text-2xl font-semibold mb-6">Update Person</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["name", "age", "number", "disease", "description", "payment", "paymentReceived", "date"].map((field, index) => (
            <input
              key={index}
              type={field === "date" ? "date" : "text"}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={editData[field]}
              onChange={(e) => setEditData({ ...editData, [field]: e.target.value })}
              className="border rounded p-2 w-full"
            />
          ))}
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Save
          </button>
          <button onClick={() => setEditId(null)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Age</th>
            <th className="py-3 px-4 text-left">Phone</th>
            <th className="py-3 px-4 text-left">Disease</th>
            <th className="py-3 px-4 text-left">Treatment</th>
            <th className="py-3 px-4 text-left">Payment</th>
            <th className="py-3 px-4 text-left">Received</th>
            <th className="py-3 px-4 text-left">Date</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {visiblePeople.map((person, index) => (
            <tr
              key={person.id}
              className={`border-t ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
            >
              <td className="py-3 px-4">{person.name}</td>
              <td className="py-3 px-4">{person.age}</td>
              <td className="py-3 px-4">{person.number}</td>
              <td className="py-3 px-4">{person.disease}</td>
              <td className="py-3 px-4">{person.description}</td>
              <td className="py-3 px-4">{person.payment} tk</td>
              <td className="py-3 px-4">{person.paymentReceived} tk</td>
              <td className="py-3 px-4">{new Date(person.date).toLocaleDateString()}</td>
              <td className="py-3 px-4">
                <div className="flex flex-nowrap gap-2 justify-center">
                  <button
                    onClick={() => handleEditClick(person)}
                    className="min-w-[40px] text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(person.id)}
                    className="min-w-[40px] text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handlePDFDownload(person)}
                    className="min-w-[40px] text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                  >
                    PDF
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {people.length > visiblePeople.length && (
        <div className="text-center py-4">
          <button
            onClick={handleViewMore}
            className="text-blue-600 hover:underline font-medium"
          >
            View more
          </button>
        </div>
      )}
    </div>
  );
};

export default PeopleList;


