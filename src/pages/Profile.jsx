import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const Profile = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);

  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [preview, setPreview] = useState('');

  // Listen for auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const docRef = doc(db, "profiles", firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setAge(data.age || '');
          setPhone(data.phone || '');
          setPhotoURL(data.photoURL || '');
          setPreview(data.photoURL || '');
        }
      }
    });

    return () => unsubscribe(); // cleanup
  }, [auth]);

  // Handle form submission
  const handleSave = async () => {
    if (!user) return;
    try {
      await setDoc(doc(db, "profiles", user.uid), {
        age,
        phone,
        photoURL,
        email: user.email,
        name: user.displayName,
      });
      alert("Profile Saved Successfully");
    } catch (err) {
      alert("Profile AreNot Save");
      console.error(err);
    }
  };

  // Handle image file
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoURL(reader.result);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow space-y-5">
      <h2 className="text-2xl font-semibold text-gray-700">Your Profile</h2>

      {preview && (
        <img src={preview} alt="Profile" className="w-24 h-24 rounded-full mx-auto" />
      )}

      <div className="flex flex-col gap-2">
        <label className="font-medium">Upload Photo</label>
        <input type="file" onChange={handlePhotoChange} />
      </div>

      <div className="space-y-2">
        <label className="font-medium block">Name</label>
        <input
          type="text"
          value={user?.displayName || ''}
          readOnly
          className="w-full border px-3 py-2 rounded bg-gray-100"
        />
      </div>

      <div className="space-y-2">
        <label className="font-medium block">Email</label>
        <input
          type="text"
          value={user?.email || ''}
          readOnly
          className="w-full border px-3 py-2 rounded bg-gray-100"
        />
      </div>

      <div className="space-y-2">
        <label className="font-medium block">Phone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="space-y-2">
        <label className="font-medium block">Age</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <button
        onClick={handleSave}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
      >
        Save Profile
      </button>
    </div>
  );
};

export default Profile;
