// src/pages/HomePage.jsx
import React from "react";
import PeopleList from "../components/PeopleList";

const HomePage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">People List</h1>
      <PeopleList />
    </div>
  );
};

export default HomePage;
