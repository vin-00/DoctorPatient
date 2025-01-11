import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";

const PatientHomePage = () => {

  const navigate = useNavigate();
  const patientInfo = JSON.parse(localStorage.getItem("user"));
  const [doctors, setDoctors] = useState([]);

  const [appointment , setAppointment] = useState([]);
  useEffect(() => {
    const fetchAppointment = async ()=>{
      const res = await fetch(`http://localhost:5000/appointments/${patientInfo._id}/patient`);
      const data = await res.json();
      
      setAppointment([...data]);
     }
    const fetchDoctors = async () => {
      try {
        const res = await fetch("http://localhost:5000/doctors");
        const data = await res.json();
        setDoctors([...data]); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
    fetchAppointment();
  }, []);

  const [showReport, setShowReport] = useState(false);

  const generateReport = () => {
    setShowReport((prev)=>!prev);
  };

  const handleDoctorClick = (doctorId) => {
    navigate(`/apply-discount/${doctorId}`);
  };


  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data from localStorage
    window.location.reload(); // Reload the page to simulate logout
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl">
        {/* Patient Info */}
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome, {patientInfo.username}!
          </h2>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md text-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Logout
          </button>
        </div>

        <div className="mb-8 bg-blue-50 p-4 rounded-md shadow-sm">
          <h3 className="text-2xl font-semibold text-gray-800">Total Balance: ₹{patientInfo.balance}</h3>
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
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left text-lg font-medium text-gray-800">
                    Doctor Name
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
                {appointment.map((record, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="border border-gray-300 px-4 py-2 text-gray-700 text-lg">
                      {record.doctorId.name}
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

        {/* Doctors Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mb-8">
          {doctors.map((doctor, index) => (
            <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col items-center p-6 cursor-pointer hover:shadow-xl hover:scale-105 transition-transform duration-300"
            onClick={() => handleDoctorClick(doctor._id)}
          >
            <div className="w-24 h-24 bg-gray-300 flex justify-center items-center rounded-full mb-4">
              <FaUserCircle size={48} className="text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
            <p className="text-gray-600">{doctor.specialty}</p>
          </div>
          ))}
        </div>

        
      </div>
    </div>
    
  );
};

export default PatientHomePage;
