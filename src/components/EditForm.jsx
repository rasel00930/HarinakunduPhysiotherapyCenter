// EditForm.js
import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const EditForm = ({ data, onClose }) => {
  const [formData, setFormData] = useState({ ...data });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const docRef = doc(db, "dailyStatements", data.id);
    await updateDoc(docRef, formData);
    alert("Data updated successfully!");
    onClose(); // Close the form
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl mb-4">Edit Information</h2>
        
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="border p-2 mb-2 w-full"
        />
        
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="border p-2 mb-2 w-full"
        />

        <input
          type="text"
          name="payment"
          value={formData.payment}
          onChange={handleChange}
          placeholder="Payment"
          className="border p-2 mb-2 w-full"
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border p-2 mb-4 w-full"
        />

        <div className="flex justify-between">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
