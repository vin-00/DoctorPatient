import React, { useState } from "react";

const SignIn = () => {
  const [formData, setFormData] = useState({
    userType: "patient", // Default to 'patient'
    username: "",
    password: "",
  });

  const [message , setMessage] = useState("");



  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    
    e.preventDefault();

    if(formData.username.length==0 || formData.password.length==0){
      setMessage("Please fill all the fields");
      setTimeout(()=>{
        setMessage("");
      },2000)
    }
    
    const response = await fetch("http://localhost:5000/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    
    console.log(data);
    if(response.ok){
      data.user.type=formData.userType;
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.reload();
    }
    else{
      setMessage("Invalid username or password .")
      setTimeout(()=>{
        setMessage("");
      },2000)
    }
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-lg">
        {/* Message Display */}
        {message.length>0 && (
          <p
            className={`mt-4 text-center ${
              message.includes("Successful") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Sign In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Type Selector */}
          <div>
            <label
              htmlFor="userType"
              className="block text-lg font-medium text-gray-700"
            >
              User Type
            </label>
            <select
              name="userType"
              id="userType"
              value={formData.userType}
              onChange={handleChange}
              className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
            >
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
            </select>
          </div>

          {/* Username Input */}
          <div>
            <label
              htmlFor="username"
              className="block text-lg font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-2"
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-lg font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-2"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
