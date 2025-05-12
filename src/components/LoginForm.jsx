import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { toast } from 'react-toastify';

const LoginForm = ({ toggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // 🔁 navigate setup

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successful!');
      navigate('/dashboard'); // ✅ redirect to dashboard
    } catch (error) {
      toast.error('Incorrect email or password');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Google login successful!');
      navigate('/dashboard'); // ✅ redirect to dashboard
    } catch (error) {
      toast.error('Google login failed');
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error('Enter your email to reset password');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent');
    } catch (error) {
      toast.error('Failed to send reset email');
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="input"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="input"
      />

      <div
        className="text-right text-sm text-blue-600 cursor-pointer"
        onClick={handleForgotPassword}
      >
        Forgot Password?
      </div>

      <button
        type="submit"
        className="btn bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Login
      </button>

      <div className="flex items-center justify-center my-2">
        <div className="h-px bg-gray-300 flex-1"></div>
        <span className="px-2 text-sm text-gray-500">or</span>
        <div className="h-px bg-gray-300 flex-1"></div>
      </div>

      <button
        onClick={handleGoogleLogin}
        type="button"
        className="flex items-center justify-center gap-3 w-full bg-white text-gray-800 border border-gray-300 rounded-lg shadow-sm hover:shadow-md py-2 transition duration-300"
      >
        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="Google"
          className="w-5 h-5 mr-2"
        />
        <span className="text-sm font-medium">Continue with Google</span>
      </button>
    </form>
  );
};

export default LoginForm;
