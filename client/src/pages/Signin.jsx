import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Logo from "../assets/logo1.png";
import Illustration from "../assets/illustration.png";
import GoogleIcon from "../assets/google-icon.svg";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    alert("Google Sign-In functionality to be implemented");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please enter both email and password");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/auth/signin', {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      // Log the response for debugging
      console.log('Login successful', response.data);

      // Explicitly check the response
      if (response.status === 200) {
        // Use replace to prevent going back to login page
        navigate('/dashboard', { replace: true });
      } else {
        setError("Unexpected response from server");
      }
    } catch (err) {
      // More detailed error logging
      console.error('Login error', err.response?.data || err.message);
      
      setError(
        err.response?.data?.message || 
        "An error occurred during login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Optional: Add a useEffect to check authentication state
  useEffect(() => {
    // Check if user is already authenticated
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('/api/auth/me', {
          withCredentials: true
        });
        
        if (response.data) {
          // If already authenticated, redirect to dashboard
          navigate('/dashboard', { replace: true });
        }
      } catch (error) {
        // Not authenticated, stay on login page
        console.log('Not authenticated');
      }
    };

    checkAuthStatus();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-pink-300 flex flex-col">
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[550px] mr-12 relative right-[200px] h-[600px]">
          <h2 className="text-pink-500 font-montserrat font-semibold text-xl">
            Welcome to Medi Mind
          </h2>
          <h1 className="text-2xl mt-[30px] font-montserrat font-bold mb-6">Sign In</h1>
          
          {error && (
            <div className="mb-4 text-red-500 text-sm text-center">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-600 font-montserrat font-semibold text-sm mb-2">
                Enter your Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-3 rounded-md bg-pink-50 border-none focus:outline-none focus:ring-2 focus:ring-pink-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 font-montserrat text-sm mb-2 font-semibold">
                Enter the Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 rounded-md bg-pink-50 border-none focus:outline-none focus:ring-2 focus:ring-pink-300"
                required
              />
              <a
                href="#"
                className="text-gray-500 text-sm font-montserrat hover:text-pink-500 mt-2 inline-block"
              >
                Forget Password?
              </a>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white font-montserrat font-semibold py-3 rounded-md transition ${
                loading 
                  ? 'bg-pink-300 cursor-not-allowed' 
                  : 'bg-pink-500 hover:bg-pink-600'
              }`}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          <div className="flex items-center my-4">
            <hr className="flex-1 border-gray-300" />
            <span className="mx-2 text-gray-500 font-montserrat">OR</span>
            <hr className="flex-1 border-gray-300" />
          </div>
          <button 
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center bg-pink-50 text-gray-700 font-montserrat font-semibold py-3 rounded-md hover:bg-pink-100 transition"
          >
            <img src={GoogleIcon} alt="Google" className="w-5 h-5 mr-2" />
            Login with Google
          </button>
          <div className="mt-4">
            <span className="text-gray-600 font-montserrat">
              Don't have an account?{" "}
              <Link to="/signup" className="text-pink-500 font-semibold">
                Sign Up
              </Link>
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <img
            src={Logo}
            alt="MediMind"
            className="w-48 md:w-64 lg:w-80 mb-6"
          />
         <span className="text-5xl md:text-6xl font-bold text-pink-500">MEDI MIND</span>
          <img
            src={Illustration}
            alt="Doctors Illustration"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}