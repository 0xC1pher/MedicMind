import React from "react";
import KissanConnect from "../assets/icon 2.jpg";
import { Link } from "react-router-dom";
import profile from "../assets/profile icon.svg";
import chat from "../assets/chat.svg";
import { SearchX } from "lucide-react";

export default function Header() {
  return (
    <div className="bg-white shadow-xl z-50 ">
      <div className="flex justify-between items-center mx-auto p-4">
        <Link to="/dashboard">
          <img
            src={KissanConnect}
            alt="kissanConnect"
            style={{ width: "150px", padding: "5px" }}
          />
        </Link>
        <div>
          <ul
            className="flex  flex-
          row gap-7 font-semibold font-poppins justify-end pr-9"
          >
            {/* search bar component */}
            <div className="relative right-[465px]">
            <div className="relative flex items-center max-w-sm">
              <input
                placeholder="Search"
                className="w-full h-12 pl-12 pr-4 rounded-full bg-lime-400 border-orange-100 border shadow-md placeholder-black"
                />
              <SearchX className="absolute left-4 text-black" />
            </div>
              </div>

            <div className="relative group">
              <Link to="/profile" className="">
                <img
                  src={profile}
                  alt=""
                  className="w-[50px]  rounded-full transition-all duration-300 ease-in-out group-hover:shadow-md group-hover:shadow-lime-500 group-hover:ring-4 group-hover:ring-lime-400 group-hover:scale-105"
                ></img>
              </Link>
            </div>

            <div className="relative group">
              <Link to="/profile" className="">
                <img
                  src={chat}
                  alt=""
                  className="w-[50px]  rounded-full transition-all duration-300 ease-in-out group-hover:shadow-md group-hover:shadow-lime-500 group-hover:ring-4 group-hover:ring-lime-400 group-hover:scale-105"
                ></img>
              </Link>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
