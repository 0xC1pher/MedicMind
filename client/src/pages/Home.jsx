// src/pages/Home.jsx
import React from 'react';
import logo from '../assets/logo1.png'; // Adjust the path based on your folder structure

const navigateToSignin = () => {
  window.location.href = "/signin";
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-pink-400 flex flex-col">
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow text-center">
        {/* Stars (Decorative) */}
      

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 pt-[100px]">
          Intelligent Care Starts with Informed Doctors
        </h1> 

        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-6 ">
          <div className="pt-4">
          <img src={logo} alt="MediMind Logo" className="h-16 mr-4" />
          </div>
          <div className='pt-[40px]'>
          <spam className="text-5xl md:text-6xl  font-bold text-pink-500">MEDI MIND</spam>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 font-semibold w-[1200px] mx-auto mb-8 font-poppins text-xl mt-[150px]">
          Empowering physicians with instant patient insights and giving patients seamless control over their health journey.
          Bridging the gap with AI-powered intelligence, secure data management, and easy access to the medical histories.
        </p>

        {/* Get Started Button */}
        <button onClick={navigateToSignin} className="bg-white text-gray-800 font-semibold py-3 px-8 mt-[100px] rounded-full shadow-lg hover:bg-gray-100 transition">
          Get Started
        </button>
      </div>
    </div>
  );
};