import React from "react";
import building from "../../data/building.png";
import { Link } from "react-router-dom";
export default function GiveReviewPage() {
  return (
    <div className=" flex  flex-col justify-center items-center bg-[#0b1225] h-[120vh] backdrop-blur-lg">
      <img alt=" Building" className="w-[70vh]" src={building} />
      <h1 className="font-mono text-red-500 text-2xl">
        This Page Still Building 🏗️{" "}
      </h1>
      <h1 className="font-mono text-2xl mb-10 text-white">
        Please Far Away ⚠️
      </h1>
      <Link to={`/`}>
        <button className="bg-pink-500 mt px-5 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-50 rounded-full hover:shadow-lg">
          🚶‍♂️ Go to Home
        </button>
      </Link>
    </div>
  );
}
