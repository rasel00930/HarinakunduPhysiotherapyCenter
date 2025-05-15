import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebase';

const OverviewSection = () => {
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalReceived, setTotalReceived] = useState(0);

  useEffect(() => {
    let unsubscribeSnapshot = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) return;

      const q = query(
        collection(db, 'people'),
        where("ownerId", "==", user.uid)
      );

      unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
        setTotalRecords(snapshot.size);

        let sum = 0;
        snapshot.forEach(doc => {
          const data = doc.data();
          const receivedRaw = data.paymentReceived;

          const received = parseFloat(
            typeof receivedRaw === "number"
              ? receivedRaw
              : (receivedRaw || "").toString().replace(/[^\d.]/g, "")
          ) || 0;

          sum += received;
        });

        setTotalReceived(sum);
      });
    });

    return () => {
      if (unsubscribeSnapshot) unsubscribeSnapshot();
      unsubscribeAuth();
    };
  }, []);

  return (
    <div className="mb-8 mt-6">
      <div className="h-0.5 bg-green-600 rounded-t-md mb-5 w-full"></div>
      <h2 className="text-2xl font-bold text-gray-800 mb-8 mt-12">Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-green-100 px-4 py-3 rounded-lg shadow-sm border border-green-200">
          <p className="text-sm text-gray-600">Total Records</p>
          <p className="text-2xl font-semibold text-green-700">{totalRecords}</p>
        </div>
        <div className="bg-blue-100 px-4 py-3 rounded-lg shadow-sm border border-blue-200">
          <p className="text-sm text-gray-600">Total Received</p>
          <p className="text-2xl font-semibold text-blue-700">{totalReceived} tk</p>
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;

