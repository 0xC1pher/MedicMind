import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import AnalyticsChart from "../components/Analyticschart";
import { TableDemo } from "../components/transaction";
import Component from "../components/piechart";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import webbg from "../assets/bg1.jpg" 

export default function Dashboard() {
  const [isHovered, setIsHovered] = useState(false);
  const userDetails = useSelector((state) => state.user.currentUser);

  //navigate to analytics page
  const navigateToAnalytics = () => {
    window.location.href = "/analysis";
  };
  const navigateToMarketplace = () => {
    window.location.href = "/marketplace";
  };
  //image slider 
  const slides = [
    { url: `https://cdn.britannica.com/77/170677-050-F7333D51/lettuce.jpg` },
    {
      url: `https://th.bing.com/th/id/OIP.5zTjFu6bD_l11r0RM6JKmAHaFD?w=284&h=193&c=7&r=0&o=5&dpr=1.3&pid=1.7`,
    },
    { url: `https://th.bing.com/th/id/OIP.8aOfr4kkMWuYVNG2pXHAAAHaEJ?w=292&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7` },
    { url: `https://th.bing.com/th/id/OIP.yaFZbShkhZbYNHBAZPn40AHaHa?w=177&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7` },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 1 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // console.log("User Details in Dashboard:", userDetails);
  return (
    <div 
      className="h-screen overflow-hidden relative"
      style={{
        backgroundImage: `url(${webbg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Semi-transparent overlay for better readability */}
      <div className="absolute inset-0 bg-white bg-opacity-40 z-0"></div>
      
      {/* Content container */}
      <div className="relative z-20 shadow-lg">
        <h1 className="text-4xl font-semibold ml-10 mt-11">Hello, User😊</h1>
        <div>
          <div className="flex flex-row">
            <div className="w-[260px] h-[230px] bg-gray-50 rounded-md ml-10 mt-10 border hover:border-black shadow-lg ease-in-out duration-300 transform hover:scale-105 hover:shadow-blue-500">
              <img
                src={userDetails.profilePicture}
                className="rounded-md w-[260px] h-[230px]"></img>
            </div>
            {/* anaytics card */}
            <div
              className="w-[400px] h-[400px] bg-white bg-opacity-90 rounded-lg ml-10 mt-16 relative bottom-[100px] border hover:border-black shadow-lg hover:shadow-lime-500 ease-in-out duration-300 transform hover:scale-105 flex flex-col items-start justify-start"
              onClick={navigateToAnalytics}
            >
              <span className="ml-2 mt-1 font-montserrat font-bold text-lg">
                Analytics
              </span>
              <div>
                <AnalyticsChart />
              </div>
              {/* end of analytics card */}
            </div>
          </div>
          <div className="flex flex-row">
            <button onClick={navigateToMarketplace} className="text-md font-semibold absolute border w-[260px] h-[50px] bg-emerald-500 bottom-[640px] ml-10 rounded-lg duration-300 hover:border-black flex items-center justify-center ease-in-out transform hover:scale-105 shadow-lg hover:shadow-lime-500">
              Go to Marketplace
            </button>
            {/* slider component */}
            <div className="group w-[330px] h-[325px] bg-white bg-opacity-90 ml-10 mt-[-70px] rounded-lg relative border shadow-xl duration-300 hover:border-black ease-in-out transform hover:scale-105 flex flex-col items-start justify-start hover:shadow-lime-500">
              <span className="ml-[70px] mt-3 font-montserrat font-semibold text-lg">
                Marketplace sales
              </span>
              <span className="ml-[60px] mt-3 font-montserrat font-semibold text-neutral-400">
                new upcoming products
              </span>
              <div
                style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
                className="w-[300px] h-[200px] rounded-lg bg-center bg-cover duration-500 relative left-4 top-[20px] border-none shadow-md hover:scale-105 ease-in-out transform hover:shadow-black"
              ></div>
              {/* Left button */}
              <div
                onClick={prevSlide}
                className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-2 text-2xl rounded-full p-2 bg-black"
              >
                <FaArrowAltCircleLeft size={20} className="text-lime-500" />
              </div>
              {/* Right button */}
              <div
                onClick={nextSlide}
                className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-2 text-2xl rounded-full p-2 bg-black"
              >
                <FaArrowAltCircleRight size={20} className="text-lime-500" />
              </div>
            </div>
            <div className="w-[330px] h-[325px] bg-white bg-opacity-90 ml-10 mt-[-70px] rounded-lg duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-lime-500 hover:border-black">
              <Component />
            </div>
            <div className="w-[550px] h-[600px] border bg-white bg-opacity-90 ml-10 mt-[-70px] rounded-lg relative bottom-[430px] duration-300 ease-in-out transform hover:scale-105 hover:border-black shadow-lg hover:shadow-lime-400">
              <span className="ml-2 mt-2 font-montserrat font-bold text-lg">
                Recent Transactions
              </span>
              <TableDemo />
            </div>
            {/* scrollbar collapse container hidden */}
            <div hidden className="w-[200px] h-[760px] bg-gray-300 ml-10 mt-[-150px] rounded-lg relative bottom-[360px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}