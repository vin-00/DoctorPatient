import React, { useState,useEffect } from "react";

const Doctor = () => {

  // Dummy financial report data
  
  const doctorInfo = JSON.parse(localStorage.getItem("user"));

  const [appointments , setAppointments] = useState([]);
    useEffect(() => {
      const fetchAppointment = async ()=>{
        const res = await fetch(`http://localhost:5000/appointments/${doctorInfo._id}/doctor`);
        const data = await res.json();
        // console.log(data);
        setAppointments([...data]);
       }
  
      fetchAppointment();
    }, []);
  const [showReport, setShowReport] = useState(false);

  // Toggle the financial report visibility
  const generateReport = () => {
    setShowReport(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data from localStorage
    window.location.reload(); // Reload the page to simulate logout
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl">
        {/* Header with Doctor Info and Logout Button */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {doctorInfo.username}
            </h2>
            <p className="text-lg text-gray-600">{doctorInfo.specialty}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md text-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Logout
          </button>
        </div>

        {/* Generate Financial Report Button */}
        <div className="mb-8">
          <button
            onClick={generateReport}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Generate Financial Report
          </button>
        </div>

        {/* Financial Report Table */}
        {showReport && (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left text-lg font-medium text-gray-800">
                    Patient Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-lg font-medium text-gray-800">
                    Fees (₹)
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-lg font-medium text-gray-800">
                    Appointment Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((record, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="border border-gray-300 px-4 py-2 text-gray-700 text-lg">
                      {record.patientId.username}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700 text-lg">
                      ₹{record.fees}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700 text-lg">
                    {new Date(record.date).toLocaleDateString("en-US", {
    weekday: "long", 
    year: "numeric",
    month: "long",
    day: "numeric"
  })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctor;
