import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-toastify';

const RegisterForm = ({ toggleForm }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`,
      });
      toast.success('Registration successful!');

      setTimeout(() => {
      toggleForm(); // Login form দেখানোর জন্য
    }, 1000); // 1 সেকেন্ড delay যাতে user success মেসেজটা দেখতে পারে

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required className="input" />
      <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required className="input" />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="input" />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="input" />
      <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required className="input" />
      <button type="submit" className="btn bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">Register</button>
      
    </form>
  );
};

export default RegisterForm;
