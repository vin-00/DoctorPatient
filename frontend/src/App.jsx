
import './App.css'

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import SignIn from './components/SignIn';
import Doctor from './components/Doctor';
import PatientHomePage from './components/PatientHomePage';
import Appointment from './components/Appointment';

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse the user object from localStorage
    }
  }, []);

  if (!user) {
    return <SignIn />;
  }

  if (user.type === "doctor") {
    return <Doctor />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PatientHomePage />} />
        <Route path="/apply-discount/:id" element={<Appointment />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App
