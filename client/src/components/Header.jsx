// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="bg-white shadow-2xl shadow-black">
      <div className="flex justify-end items-center mx-auto p-5">
        <div>
          <ul className="flex gap-7 font-bold font-montserrat justify-end pr-9 text-[17px] text-gray-700">
            <Link to="/">
              <li className="relative  hover:text-pink-500 duration-300 hover:after:content-['•'] hover:after:absolute hover:after:bottom-[-10px] hover:after:left-1/2 hover:after:-translate-x-1/2 hover:after:text-lg hover:after:leading-none hover:after:text-pink-500">
                Home
              </li>
            </Link>
            <Link to="/signin">
              <li className="relative hover:text-pink-500 duration-300 hover:after:content-['•'] hover:after:absolute hover:after:bottom-[-10px] hover:after:left-1/2 hover:after:-translate-x-1/2 hover:after:text-lg hover:after:leading-none hover:after:text-pink-500">
                Sign in
              </li>
            </Link>
            <Link to="/signup">
              <li className="relative hover:text-pink-500 duration-300 hover:after:content-['•'] hover:after:absolute hover:after:bottom-[-10px] hover:after:left-1/2 hover:after:-translate-x-1/2 hover:after:text-lg hover:after:leading-none hover:after:text-pink-500">
                Sign up
              </li>
            </Link>
            <Link to="/about">
              <li className="relative hover:text-pink-500 duration-300 hover:after:content-['•'] hover:after:absolute hover:after:bottom-[-10px] hover:after:left-1/2 hover:after:-translate-x-1/2 hover:after:text-lg hover:after:leading-none hover:after:text-pink-500">
                About
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}