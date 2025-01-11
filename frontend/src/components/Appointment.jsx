import React, { useState ,useEffect} from "react";
import { useParams ,useNavigate } from "react-router-dom";

const Appointment = () => {
  
  const { id } = useParams();
  const [doctor , setDoctor] = useState({});

  const [discount , setDiscount] = useState(false);
  const patient = JSON.parse(localStorage.getItem("user"));

  useEffect(()=>{
        const fetchData = async ()=>{
            const res = await fetch(`http://localhost:5000/doctor/${id}`);
            const data = await res.json();
            setDoctor(data);
        }

        const check = async ()=>{
            const res = await fetch(`http://localhost:5000/appointment/${patient._id}/${id}`)
            const data = await res.json();
            setDiscount(data);
        }
        fetchData();
        check();
    }
  ,[])

  const navigate = useNavigate();
  const handleSubmit = async ()=>{

    const res = await fetch("http://localhost:5000/appointment",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                patientId : patient._id ,
                doctorId : id, 
                fees: discount ? 0.5*doctor.fees:doctor.fees,
                date : new Date()
            }),
        }
    )

    const data = await res.json();
    if(res.ok){
        console.log(data);
        patient.balance -= data.fees;
        localStorage.setItem("user",JSON.stringify(patient));
        // console.log("Success");
    }
    navigate("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Create Appointment
        </h1>

        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold text-indigo-600">
            {doctor.name}
          </h2>
          <p className="text-gray-600">{doctor.specialty}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Consultation Fee:</span>{" "}
            <span className="text-gray-800">₹{doctor.fees}</span>
          </p>
          
          {discount && <p className="text-lg text-green-600">
              <span className="font-semibold">First Time Consultation Discount Applied:</span> {50}% off!
            </p>}
            
            {discount && <p className="text-lg text-gray-700 mt-2">
            <span className="font-semibold">Final Fee:</span>{" "}
            <span className="text-gray-800">₹{0.5*doctor.fees}</span>
          </p>}
          
        </div>

        <button
          className={`w-full py-2 text-lg font-semibold text-white rounded-lg 
        bg-indigo-600 hover:bg-indigo-700"
          }`}
          onClick={handleSubmit}
          
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default Appointment;
