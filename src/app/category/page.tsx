"use client";

import React, { useEffect, useState } from "react";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories");
        const data = await res.json();
let list = [];

if (Array.isArray(data)) {
  list = data;
} else {
  list = data.data;
}
        setCategories(list);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-[85%] mx-auto py-10">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category, idx) => (
          <div
            key={idx}
className="border rounded-md shadow-sm transition-all duration-500 flex flex-col items-center hover:shadow-[0_0_10px_2px_rgba(50,197,94,0.4)]"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-[300px] object-cover rounded-md "
            />
            <h3 className="my-5 text-2xl font-semibold text-green-700 text-center">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
