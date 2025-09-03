import React from "react";
import { RiComputerLine } from "react-icons/ri";
import { FaHeartbeat, FaMoneyBillWave, FaGraduationCap } from "react-icons/fa";

const categories = [
  { name: "Technology", icon: <RiComputerLine size={40} />, color: "bg-blue-100" },
  { name: "Health", icon: <FaHeartbeat size={40} />, color: "bg-pink-100" },
  { name: "Finance", icon: <FaMoneyBillWave size={40} />, color: "bg-green-100" },
  { name: "Education", icon: <FaGraduationCap size={40} />, color: "bg-yellow-100" },
];

const Category = () => {
  return (
    <div className="m-10">
      <h1 className="text-4xl font-bold  text-center">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 my-10">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer ${category.color}`}
          >
            <div className="mb-3 text-gray-700">{category.icon}</div>
            <h2 className="text-lg font-semibold text-gray-800">{category.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;

