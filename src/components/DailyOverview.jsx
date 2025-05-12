import React from 'react';

const DailyOverview = ({ data }) => {
  const totalRecords = data.length;

  const totalReceived = data.reduce((sum, item) => {
    const amount = parseFloat(
      typeof item.payment === "number"
        ? item.payment
        : (item.payment || "").toString().replace(/[^\d.]/g, "")
    ) || 0;
    return sum + amount;
  }, 0);

  return (
    <div className="mb-8 mt-6">
      <div className="h-0.5 bg-green-600 rounded-t-md mb-5 w-full"></div>
      <h2 className="text-2xl font-bold text-gray-800 mb-8 mt-12">Daily Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-green-100 px-4 py-3 rounded-lg shadow-sm border border-green-200">
          <p className="text-sm text-gray-600">Total Records</p>
          <p className="text-2xl font-semibold text-green-700">{totalRecords}</p>
        </div>
        <div className="bg-blue-100 px-4 py-3 rounded-lg shadow-sm border border-blue-200">
          <p className="text-sm text-gray-600">Total Payment</p>
          <p className="text-2xl font-semibold text-blue-700">{totalReceived} tk</p>
        </div>
      </div>
    </div>
  );
};

export default DailyOverview;
