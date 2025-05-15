import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { auth } from '../firebase';


const AddPeopleForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [number, setNumber] = useState('');
  const [description, setDescription] = useState('');
  const [disease, setDisease] = useState('');
  const [payment, setPayment] = useState('');
  const [paymentReceived, setPaymentReceived] = useState('');
  const [date, setDate] = useState('');

  const navigate = useNavigate();  // useNavigate hook to navigate

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await addDoc(collection(db, "people"), {
      name,
      age,
      number,
      description,
      disease,
      payment,
      paymentReceived,
      date,
      ownerId: auth.currentUser.uid,  // ✅ User-specific tagging
      createdAt: new Date()
    });

    // Clear fields
    setName('');
    setAge('');
    setNumber('');
    setDescription('');
    setDisease('');
    setPayment('');
    setPaymentReceived('');
    setDate('');

    alert("Person added successfully!");
    navigate("/dashboard?view=home");

  } catch (error) {
    console.error("Error adding document: ", error);
    alert("Failed to add person.");
  }
};


  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full space-y-5"
    >
      <h2 className="text-xl font-semibold text-gray-700">Add Person</h2>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-600">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Enter name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-600">Age</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          placeholder="Enter age"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-600">Phone Number</label>
        <input
          type="tel"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
          placeholder="e.g. 017XXXXXXXX"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-600">Disease</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder="e.g. Diabetes"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-600">Treatment</label>
        <input
          type="text"
          value={disease}
          onChange={(e) => setDisease(e.target.value)}
          required
          placeholder="Write something..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-600">Village</label>
        <input
          type="text"
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
          required
          placeholder="Write something..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-600">Payment</label>
        <input
          type="number"
          value={paymentReceived}
          onChange={(e) => setPaymentReceived(e.target.value)}
          required
          placeholder="e.g. 500"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-600">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
      >
        Add Person
      </button>
    </form>
  );
};

export default AddPeopleForm;

