import allCategories from "@/apis/allCategories";
import React from "react";
import SwiperCategory from "../SwiperCategory/SwiperCategory";
import category from "../../app/category/page";

const CategorySlider = async () => {
  const data = await allCategories();
  console.log(data);
  return (
    <div className="my-10">
      <SwiperCategory categoryProps={data} />
    </div>
  );
};

export default CategorySlider;
