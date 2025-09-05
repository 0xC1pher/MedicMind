import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo1.png";
import Illustration from "../assets/illustration.png";

export default function SignUp() {
  const [formData, setFormData] = useState({
    employeeName: '',
    email: '',
    phoneNumber: '',
    address: '',
    specialization: '',
    password: ''
  });  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone number validation
    const phoneRegex = /^\d{10}$/;
    if (!formData.phoneNumber || !phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }

    // Password validation
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    // Other required fields
    const requiredFields = ['employeeName', 'address', 'specialization'];
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        // Handle specific error messages from backend
        alert(data.message || 'Error in registration');
        setLoading(false);
        return;
      }
      
      alert('Registration successful! Welcome to MediMind!');
      setLoading(false);
      // Optionally redirect to login or dashboard
    } catch (error) {
      console.error('Registration error:', error);
      alert('Error in registration');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-pink-300 flex flex-col">
      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center">
        {/* Left: Logo and Illustration */}
        <div className="flex flex-col items-center mr-12">
          <img 
            src={Logo}
            alt="MediMind"
            className="w-48 md:w-64 lg:w-80 mb-6 relative bottom-[100px]"
          />
          <span className="text-5xl md:text-6xl font-bold text-pink-500 relative bottom-[100px]">MEDI MIND</span>
          <img
            src={Illustration}
            alt="Doctors Illustration"
            className="w-full max-w-md "
          />
        </div>

        {/* Right: Sign-Up Form */}
        <div className="mt-10 mb-10 bg-white p-8 rounded-lg shadow-lg ml-[300px] w-[700px]">
          <h1 className="text-3xl text-purple-600 font-montserrat font-bold mb-6">Register</h1>
          <h2 className="text-gray-600 font-montserrat font-semibold text-lg mb-4">
            User Details
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Box 1: Personal Details */}
            <div className="mb-6 p-4 border border-gray-200 rounded-md shadow-sm">
              <div className="mb-4">
                <label className="block text-gray-600 font-montserrat text-sm mb-2">
                  Enter the Employee Name:
                </label>
                <input
                  type="text"
                  id="employeeName"
                  placeholder="Employee Name"
                  value={formData.employeeName}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-md bg-pink-50 border-none focus:outline-none focus:ring-2 focus:ring-pink-300 ${errors.employeeName ? 'border-red-500' : ''}`}
                />
                {errors.employeeName && <p className="text-red-500 text-xs mt-1">{errors.employeeName}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 font-montserrat text-sm mb-2">
                  Enter the Employee Email:
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-md bg-pink-50 border-none focus:outline-none focus:ring-2 focus:ring-pink-300 ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 font-montserrat text-sm mb-2">
                  Enter the Employee Phone number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-md bg-pink-50 border-none focus:outline-none focus:ring-2 focus:ring-pink-300 ${errors.phoneNumber ? 'border-red-500' : ''}`}
                />
                {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
              </div>
            </div>

            {/* Box 2: Address */}
            <div className="mb-6 p-4 border border-gray-200 rounded-md shadow-sm">
              <div className="mb-4">
                <label className="block text-gray-600 font-montserrat text-sm mb-2">
                  Address
                </label>
                <textarea
                  id="address"
                  placeholder="Address details"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-md bg-pink-50 border-none focus:outline-none focus:ring-2 focus:ring-pink-300 ${errors.address ? 'border-red-500' : ''}`}
                  rows="3"
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
            </div>

            {/* Box 3: Specialization and Password */}
            <div className="mb-6 p-4 border border-gray-200 rounded-md shadow-sm">
              <div className="mb-4">
                <label className="block text-gray-600 font-montserrat text-sm mb-2">
                  Specialization Field:
                </label>
                <select
                  id="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-md bg-pink-50 border-none focus:outline-none focus:ring-2 focus:ring-pink-300 ${errors.specialization ? 'border-red-500' : ''}`}
                >
                  <option value="">Select Specialization</option>
                  <option value="DOC">Doctor</option>
                  <option value="front desk">Front Desk</option>
                </select>
                {errors.specialization && <p className="text-red-500 text-xs mt-1">{errors.specialization}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 font-montserrat text-sm mb-2">
                  Create strong Password:
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-md bg-pink-50 border-none focus:outline-none focus:ring-2 focus:ring-pink-300 ${errors.password ? 'border-red-500' : ''}`}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
            </div>

            <div className="flex flex-row gap-7">
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-[200px] bg-pink-500 text-white font-montserrat font-semibold py-3 rounded-md hover:bg-pink-600 transition"
                >
                  {loading ? 'Registering...' : 'Sign Up'}
                </button>
              </div>
              <p className="text-center text-gray-500 font-montserrat text-sm mt-4">
                I already have an account{" "}
                <Link to="/signin" className="text-pink-500 hover:text-pink-600">
                  Sign in
                </Link>
              </p>
            </div> 
          </form>
        </div>
      </div>
    </div>
  );
}