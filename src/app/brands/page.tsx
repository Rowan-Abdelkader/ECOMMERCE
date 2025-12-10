import axios from "axios";
import React from "react";

const Brands = async () => {
  const res = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  const brands = res.data.data;

  return (


    <div className="w-[85%] mx-auto py-7">
		<h1 className="text-4xl font-semibold text-green-600 text-center mb-12">All Brands
</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {brands.map((brand, idx) => (
          <div key={idx} className="border rounded-sm shadow-sm flex flex-col transition-all duration-500 items-center hover:shadow-[0_0_10px_2px_rgba(50,197,94,0.4)]">
            <img
              src={brand.image}
              alt={brand.name}
              className="w-full h-[200px] object-cover rounded-md"
            />
            <h3 className="my-5 text-center">
              {brand.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
