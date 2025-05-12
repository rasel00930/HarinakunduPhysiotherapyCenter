// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/HomePage";
import Analytics from "./pages/DataAnalytics";
import Profile from "./pages/Profile";
import DailyStatement from "./pages/DailyStatement";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
<Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="home" element={<Home />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="profile" element={<Profile />} />
          <Route path="daily-statement" element={<DailyStatement />} /> {/* ✅ এখানে ঠিক করা হয়েছে */}
          
          
        </Route>
      </Routes>
      <ToastContainer position="top-center" />
    </Router>
  );
}

export default App;

