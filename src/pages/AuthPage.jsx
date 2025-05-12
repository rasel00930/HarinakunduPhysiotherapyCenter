import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import logo from "../assets/logo.jpg";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl flex overflow-hidden">
        {/* Left side with logo and welcome text */}
        <div className="w-1/2 bg-white flex flex-col items-center justify-center p-8">
          <img src={logo} alt="Logo" className="w-40 h-40 object-contain mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Welcome to
          </h2>
          <p className="text-green-600 text-center text-lg font-medium mt-1">
            Harinakundu Physiotherapy Center
          </p>
        </div>

        {/* Right side with login or signup form */}
        <div className="w-1/2 bg-gray-50 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
         {isLogin ? (
  <LoginForm />
) : (
  <RegisterForm toggleForm={() => setIsLogin(true)} />
)}
          <div className="text-center mt-4">
            {isLogin ? (
              <p>
                Don’t have an account?{' '}
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => setIsLogin(true)}
                >
                  Log In
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

