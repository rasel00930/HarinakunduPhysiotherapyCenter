import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const AddDailyForm = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    payment: "",
    date: "",
    createdAt: new Date(),
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "dailyStatements"), {
        ...form,
        payment: parseFloat(form.payment),
        createdAt: Timestamp.now(),
      });
      alert("Daily statement saved!");
      setForm({ name: "", phone: "", payment: "", date: "" });
    } catch (error) {
      console.error("Error adding daily statement:", error);
      alert("Failed to save daily statement.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg space-y-4 border border-gray-100"
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Add Daily Statement
        </h2>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Mobile Number
          </label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter mobile number"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Payment (tk)</label>
          <input
            name="payment"
            value={form.payment}
            onChange={handleChange}
            placeholder="Enter payment"
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Date</label>
          <input
            name="date"
            value={form.date}
            onChange={handleChange}
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition duration-200"
        >
          Save Statement
        </button>
      </form>
    </div>
  );
};

export default AddDailyForm;
