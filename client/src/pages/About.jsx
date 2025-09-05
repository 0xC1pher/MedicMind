
import React from "react";
import border from "../assets/border.png";
import vec from "../assets/Vector.svg";

export default function About() {
  return (
    <div className="min-h-screen">
      <div className="w-full flex flex-row">
        <h1 className="text-7xl font-montserrat font-bold  text-start mt-20 pt-20 ml-20 pl-20 ">
          About Us
        </h1>
        <div className="absolute ml-20 mt-4">
          <img src={vec} alt="vector" className="mt-20 pt-12 w-[350px]"></img>
        </div>
      </div>

      <div className="pt-10 ">
        <h1 className="text-3xl font-semibold text-emerald-600 w-1/2 ml-20 mt-20">
          Who we are :{" "}
        </h1>
        <div className="flex flex-row">
          <div className="w-1/2 ml-20 mt-15 ">
            <p className="mt-5 ml-1 pr-1 w-3/4">
              Welcome to Kisaan Connect, a platform dedicated to empowering
              farmers and buyers through seamless contract farming solutions.
              Our mission is to bridge the gap between farmers and markets,
              ensuring a fair and transparent process where both parties
              benefit. We provide an innovative space where farmers can secure
              buyers for their produce before the planting season, reducing
              financial risks and ensuring a guaranteed market. Buyers, on the
              other hand, gain access to fresh, quality produce straight from
              the source, fostering trust and long-term relationships.At Kisaan
              Connect, we provide an innovative digital space where farmers can
              connect with buyers before even sowing a seed, securing demand for
              their produce ahead of the planting season.forward-looking
              approach not only reduces financial risk for farmers but also
              guarantees them a reliable market, helping them to plan better,
              invest wisely, and grow confidently. By having a predetermined
              buyer, farmers can focus on quality cultivation, knowing that they
              have a market waiting for their harvest. This security transforms
              their agricultural practice, leading to greater stability, income
              predictability, and an overall uplift in their livelihood
            </p>
          </div>
          <div className="mr-10">
            <img
              src="https://resize.indiatv.in/resize/newbucket/1200_-/2022/08/modi-jay-1660542305.jpg"
              alt="modiji"
              className="w-[700px] h-[400px]  "
            ></img>
          </div>
        </div>

        <div className="pt-10 mt-12">
          <span className="w-1/2 ml-20 mt-15 text-3xl font-semibold font-serif text-emerald-600">
            Team Members :
          </span>
        </div>

        <div className="pt-20 mt-15">
          <div className="flex flex-row border-none rounded-md shadow-xl w-[1000px] h-[200px] ml-20 justify-center items-center gap-[300px]">
            <div className="w-1/4 text-end">IMG</div>
            <div className="w-3/4 ">
              <h1 className="text-2xl font-mono text-emerald-700 text-start">
                Pranav BJ
              </h1>
              <p className="font-medium font-mono mt-3">
                Hi i am Pranav Bj currently pursuing 3rd year B.E in CSD,AIT.If
                you want to connect to me down below's link
              </p>
              <a
                href="https://www.linkedin.com/in/pranav-bj-545a1b260/"
                className="font-mono text-blue-800 font-medium"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className="flex flex-row border-none rounded-md shadow-xl w-[1000px] h-[200px] ml-20 justify-center items-center gap-[300px] mt-7">
            <div className="w-1/4 text-end">IMG</div>
            <div className="w-3/4 ">
              <h1 className="text-2xl font-mono text-emerald-700 text-start">
                Neeraj K Shastry
              </h1>
              <p className="font-medium font-mono mt-3">
                Hi i am Neeraj K Shastry currently pursuing 3rd year B.E in
                CSE,AIT.If you want to connect to me down below's link
              </p>
              <a href="" className="font-mono text-blue-800">
                LinkedIn
              </a>
            </div>
          </div>

          <div className="flex flex-row border-none rounded-md shadow-xl w-[1000px] h-[200px] ml-20 justify-center items-center gap-[300px] mt-7">
            <div className="w-1/4 text-end">IMG</div>
            <div className="w-3/4 ">
              <h1 className="text-2xl font-mono text-emerald-700 text-start">
                Dasari Ranga Eswar 
              </h1>
              <p className="font-medium font-mono mt-3">
                Hi i am Dasari Ranga Eshwar currently pursuing 3rd year B.E in
                CSD,AIT.If you want to connect to me down below's link
              </p>
              <a href="https://www.linkedin.com/in/eshwar-roy-95559b272/" className="font-mono text-blue-800">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
      <img src={border} alt="" className="w-full h-[40px]"></img>
    </div>
  );
}