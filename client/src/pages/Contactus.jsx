import React from "react";
import vector from "../assets/Vector.svg";
import border from "../assets/border.png"
import { Link } from "react-router-dom";
import care from "../assets/icon 2.jpg"

export default function ContactUs() {
  return (
    <div className="max-h-screen ">
      {/* sub header */}
      <div className="flex flex-row mt-[100px] ml-[60px]  ">
        <div className="flex flex-row justify-center items-center ml-10">
          <h1 className="font-montserrat font-bold text-7xl text-center ">
            Contact Us
          </h1>
         
        </div>        
      </div>

      <div className="flex flex-row">
        <div className="ml-[60px] mt-20 w-1/2">
          <h1 className="font-medium text-base mt-5">Full Name</h1>
          <input
            type="text"
            placeholder="kisaan"
            className="p-3 rounded-lg border border-none shadow-md bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-100 text-base mt-3 w-3/4 "
          ></input>
          <h1 className="font-medium text-base mt-10">Email/Aadhar Id</h1>
          <input
            type="text"
            placeholder="kisaan@email.com"
            className="p-3 rounded-lg border border-none shadow-md bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-100 text-base mt-3 w-3/4 "
          ></input>
          <h1 className="font-medium text-base mt-10">Phone Number</h1>
          <input
            type="text"
            placeholder="9900223444"
            className="p-3 rounded-lg border border-none shadow-md bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-100 text-base mt-3 w-3/4 "
          ></input>
        </div>

        <div className="ml-[60px] mt-20 w-1/2">
          <h1 className="font-medium text-base mt-5">Subject</h1>
          <input
            type="text"
            placeholder="XYZ"
            className="p-3 rounded-lg border border-none shadow-md bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-100 text-base mt-3 w-3/4 "
          ></input>
          <h1 className="font-medium text-base mt-10">Issue</h1>
          <input
            type="text"
            placeholder="i am facing this problem"
            className="p-3 rounded-lg border border-none shadow-md bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-100  mt-3 w-3/4 h-[179px] "
          ></input>
        </div>
      </div>

      <div className="flex justify-center items-start mt-[80px] pt-5">
        <Link to="/signin">
          <button className="relative bottom-6 transition duration-300 ease-in-out bg-green-800 hover:bg-lime-600 transform hover:-translate-x-1 hover:scale-110  border border-b-2 w-[200px] h-[40px] rounded-md border-none  text-white font-[500] shadow-2xl shadow-black">
            Send
          </button>
        </Link>
      </div>
        <img src={border} alt='' className="w-full h-[50px] mt-5"></img>
    </div>
  );
}
