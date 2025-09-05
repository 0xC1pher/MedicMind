import React, { useState, useEffect } from "react";
import axios from "axios";
import ring from "../assets/vector.svg";
import garden from "../assets/download.jpg";
import { FaPen } from "react-icons/fa6";
import { useRef } from "react";
import { Check } from "lucide-react";
import buyer from "../assets/buyer.mp4";
import farmer from "../assets/farmer.mp4";
import {signOutFailure, signOutStart, signOutSuccess } from "../redux/user/userSlice";
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"

export default function UserProfile() {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [aadharID, setAadharID] = useState(null);
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const fileRef = useRef(null);

  // function to submit profile picture to cloudinary

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
      console.log("Selected File:", selectedFile);
    }
  };

  const UploadButton = () => {
    const [isHovered, setIsHovered] = useState(false);
    const fileRef = useRef(null);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const handleFileUpload = () => {
      if (fileRef.current) {
        fileRef.current.click();
      }
    };

    return (
      <div>
        <input
          type="file"
          ref={fileRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleFileChange}
        />
        <button
          onClick={handleFileUpload}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`border h-[45px] rounded-full flex items-center bg-gray-500 text-white relative top-[-30px] right-[-10px] duration-700 overflow-hidden ${
            isHovered ? "w-[200px] pl-3 bg-black" : "w-[45px] justify-center"
          }`}
        >
          <FaPen className="w-[23px] transition-opacity duration-500" />
          {isHovered && (
            <span className="ml-2 transition-all duration-500">
              Upload Image
            </span>
          )}
        </button>

        {/* Hidden File Input */}
      </div>
    );
  };
  const SubmitButton = () => {
    const [isHovered1, setIsHovered1] = useState(false);

    const handleMouseEnter1 = () => setIsHovered1(true);
    const handleMouseLeave1 = () => setIsHovered1(false);

    return (
      <button
        onClick={submitImage}
        onMouseEnter={handleMouseEnter1}
        onMouseLeave={handleMouseLeave1}
        className={`border h-[45px] rounded-full flex justify-center items-center bg-blue-600 text-white relative top-[70px] right-[34px] hover:bg-blue-500 duration-700 ${
          isHovered1
            ? "w-[200px] pr-1 justify-start"
            : "w-[45px] justify-center"
        }`}
      >
        <Check className="w-[23px]" />
        {isHovered1 && (
          <span className="ml-2 transition-all duration-500">Submit Image</span>
        )}
      </button>
    );
  };

  const submitImage = async () => {
    if (!image) {
      alert("No image selected");
      return;
    }

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "profile_picture_app");
    data.append("cloud_name", "dntoevkln");

    try {
      // Upload image to Cloudinary
      const cloudRes = await fetch(
        "https://api.cloudinary.com/v1_1/dntoevkln/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      if (!cloudRes.ok) {
        throw new Error(
          `Cloudinary upload failed with status ${cloudRes.status}`
        );
      }

      const cloudData = await cloudRes.json();

      if (!cloudData.secure_url) {
        throw new Error("Cloudinary response did not include a secure_url");
      }

      console.log("Image uploaded successfully:", cloudData.secure_url);

      // Update profile in the database
      const updateRes = await axios.patch(
        `http://localhost:3000/api/auth/profile-picture`,
        { profilePicture: cloudData.secure_url },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Debug response
      console.log("Response:", updateRes);

      if (updateRes.status === 200) {
        alert(
          "Profile picture updated successfully refresh the page to view changes"
        );
      } else {
        console.error(
          "Failed to update profile picture in the database:",
          updateRes.statusText
        );
      }
    } catch (err) {
      console.error("Axios error:", err.response?.data || err.message);
      throw err;
    }
  };

  useEffect(() => {
    const getPersistedUserData = () => {
      try {
        // Parse the entire persisted root
        const persistedState = JSON.parse(localStorage.getItem("persist:root"));
        // console.log("Persisted State:", persistedState);

        // Parse the `user` key
        const userState = JSON.parse(persistedState.user);
        // console.log("User State:", userState);

        // Access Aadhaar ID
        const aadharCard = userState.currentUser?.aadharCard;
        // console.log("Extracted Aadhaar ID:", aadharCard);

        return aadharCard;
      } catch (err) {
        console.error("Error accessing persisted user data:", err);
        return null;
      }
    };

    const aadhar = getPersistedUserData();
    // console.log("Extracted Aadhaar ID:", aadhar);
    setAadharID(aadhar);
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!aadharID) {
        console.warn("No Aadhaar ID available");
        setError(
          "No Aadhaar ID found for the logged-in user. Please log in again."
        );
        setLoading(false);
        return;
      }

      console.log("Fetching user details for Aadhaar ID:", aadharID);

      try {
        const response = await axios.get(
          `http://localhost:3000/api/user/${aadharID}`
        );
        // console.log("API Response:", response.data);
        setUserDetails(response.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch user details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (aadharID) {
      fetchUserDetails();
    }
  }, [aadharID]);

  // function for sign out :)

  const dispatch = useDispatch();
  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch('http://localhost:3000/api/auth/signout', {
        method: 'GET', 
      });
  
      console.log('SignOut Response:', res);
  
      if (!res.ok) {
        const errorText = await res.text(); // Read the error text if the response isn't ok
        throw new Error(`SignOut Failed: ${errorText}`);
      }
  
      const data = await res.json(); // Only read JSON once
      console.log('SignOut Data:', data);
  
      if (!data.success) {
        console.log('SignOut Failed:', data.message);
        dispatch(signOutFailure(data.message));
        return;
      }
      dispatch(signOutSuccess());
      navigate('/signin');
    } catch (error) {
      console.log('SignOut Error:', error.message);
      dispatch(signOutFailure(error.message));
    }
  };
  
  
  // function to render user specific details taking occupation as an criteria
  const RenderOccupationSpecificDetails = () => {
    if (!userDetails || !userDetails.occupation) return null;

    if (userDetails.occupation === "Buyer") {
      return (
        <div className="border-none mt-10 p-6 w-11/12 mx-auto shadow-lg rounded-lg hover:shadow-lime-600 duration-700">
          <span className="font-bold text-3xl mb-5">Buyer Details 🛒</span>

          <div className="flex flex-row space-x-6">
            {/* Left Side - Details */}
            <div className="flex-1 flex flex-col space-y-6">
              <div className="flex flex-col mt-[50px]">
                <span className="font-semibold text-lg mb-3">
                  Address Details:
                </span>
                <p className="font-medium text-md border-none bg-slate-50 h-[50px]  flex justify-start pl-2 items-center rounded-md hover:bg-lime-600 hover:text-white duration-500">
                  {userDetails.address}
                </p>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg mb-3">GST Number :</span>
                <p className="font-medium text-md border-none bg-slate-50 h-[50px] flex justify-start pl-2 items-center rounded-md hover:bg-lime-600 hover:text-white duration-500">
                  {userDetails?.buyerDetails?.gstNumber}
                </p>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg mb-3">Buyer Type :</span>
                <p className="font-medium text-md border-none bg-slate-50 h-[50px] flex justify-start pl-2 items-center rounded-md hover:bg-lime-600 hover:text-white duration-500">
                  {userDetails?.buyerDetails?.buyerType}
                </p>
              </div>

              <div className="flex flex-row gap-8">
                <div>
                  <button onClick={handleSignOut} className="border-none bg-red-600 h-[50px] w-[150px] text-lg font-semibold text-white rounded-full hover:bg-red-400 duration-700">
                    Sign out
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
                <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                  <video
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover pointer-events-none"
                  >
                    <source src={buyer} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (userDetails.occupation === "Farmer") {
      return (
        <div className="border-none mt-10 p-6 w-11/12 mx-auto shadow-lg rounded-lg hover:shadow-lime-600 duration-700">
          <span className="font-bold text-3xl mb-5">Farmer Details 🧑🏻‍🌾</span>

          <div className="flex flex-row space-x-6">
            {/* Left Side - Details */}
            <div className="flex-1 flex flex-col space-y-6">
              <div className="flex flex-col">
                <span className="font-semibold text-lg mb-3">
                  Address Details:
                </span>
                <p className="font-medium text-md border-none bg-slate-50 h-[50px] flex justify-start pl-2 items-center rounded-md hover:bg-lime-600 hover:text-white duration-500">
                  {userDetails.address}
                </p>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg mb-3">Land Size :</span>
                <p className="font-medium text-md border-none bg-slate-50 h-[50px] flex justify-start pl-2 items-center rounded-md hover:bg-lime-600 hover:text-white duration-500">
                  {userDetails?.farmerDetails?.farmSize}
                </p>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg mb-3">
                  Crops Grown 🌾:
                </span>
                <p className="font-medium text-md border-none bg-slate-50 h-[50px] flex justify-start pl-2 items-center rounded-md hover:bg-lime-600 hover:text-white duration-500">
                  {userDetails?.farmerDetails?.cropsGrown}
                </p>
              </div>

              <div className="flex flex-row gap-8">
                <div>
                  <button onClick={handleSignOut} className="border-none bg-red-600 h-[50px] w-[150px] text-lg font-semibold text-white rounded-full hover:bg-red-400 duration-700">
                    Sign out
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="flex-1">
              <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
                <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                  <video
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover pointer-events-none"
                  >
                    <source src={farmer} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
  // end of the function

  return (
    <div className="min-h-screen">
      <div className="flex justify-center items-center mt-10">
        <div
          className="border-none shadow-lg w-11/12 h-48 flex flex-row items-center justify-start text-start rounded-xl relative overflow-hidden "
          style={{
            backgroundImage: `url(${garden})`,
            backgroundSize: "100% auto",
            backgroundPosition: "bottom",
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/100 to-transparent w-3/4 z-10"></div>

          <span className="text-white ml-7 text-5xl font-bold font-montserrat relative z-20">
            User Profile
          </span>
          <img
            src={ring}
            alt=""
            className="w-[300px] relative right-[210px] bottom-[10px] z-20"
          />
        </div>
      </div>

      <div className="p-6 w-11/12 h-auto mx-auto bg-white shadow-lg rounded-lg hover:shadow-xl hover:shadow-lime-500 duration-500 mt-10">
        {loading ? (
          <p className="text-blue-500">Loading...</p>
        ) : error ? (
          <div>
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          userDetails && (
            <div>
              <div className="flex flex-row ">
                <div className=" p-4 rounded-md w-1/2 mr-[23px] ">
                  <p className="mb-5">
                    <span className="font-bold text-3xl mt-[10px]">
                      General Info🌞
                    </span>
                  </p>

                  <div className="flex flex-row mb-3">
                    <span className="font-semibold text-xl mt-[10px] ">
                      Name :
                    </span>
                    <p className="font-medium text-lg border-none text-gray-600 bg-slate-50 w-[286px] h-[50px] flex justify-center items-center rounded-md ml-[10px] hover:bg-lime-600 hover:text-white duration-500 ">
                      {userDetails.username}
                    </p>
                  </div>
                  <div className="flex flex-row mb-3">
                    <span className="font-semibold text-xl mt-[10px]">
                      Occuption :
                    </span>
                    <p className="font-medium text-lg border-none text-gray-600  bg-slate-50 w-[240px] h-[50px] flex justify-center items-center rounded-md ml-[10px] hover:bg-lime-600 hover:text-white duration-500">
                      {userDetails.occupation}
                    </p>
                  </div>

                  <div className="flex flex-row mb-3">
                    <span className="font-semibold text-xl mt-[10px]">
                      Gender :
                    </span>
                    <p className="font-medium text-lg border-none text-gray-600 bg-slate-50 w-[270px] h-[50px] flex justify-center items-center rounded-md ml-[10px] hover:bg-lime-600 hover:text-white duration-500">
                      {userDetails.gender}
                    </p>
                  </div>
                  <div className="flex flex-row">
                    <span className="font-semibold text-xl mt-[10px]">
                      Contact info:
                    </span>
                    <p className="font-medium text-lg border-none text-gray-600 bg-slate-50 w-[223px] h-[50px] flex justify-center items-center rounded-md ml-[10px] hover:bg-lime-600 hover:text-white duration-500">
                      {userDetails.phoneNumber}
                    </p>
                  </div>
                </div>

                <div className="w-1/2 flex justify-end items-center text-center relative right-[354px] ">
                  {/* image container  */}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    ref={fileRef}
                    onChange={(e) => setImage(e.target.files[0])}
                  ></input>
                  <img
                    src={userDetails.profilePicture}
                    className="border-black shadow-xl w-[300px] h-[300px] rounded-xl bg-lime-400 duration-500  hover:shadow-xl hover:shadow-lime-100"
                  ></img>

                  <UploadButton />

                  <SubmitButton />
                </div>
              </div>
              {/* User Specific details */}
            </div>
          )
        )}
      </div>
      {RenderOccupationSpecificDetails()}
    </div>
  );
}
