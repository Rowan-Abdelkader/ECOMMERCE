"use client";

import React from "react";
import Image from "next/image";
import img1 from "../../../public/myphotos/1.jpg";
import img2 from "../../../public/myphotos/2.jpg";
import img3 from "../../../public/myphotos/3.jpg";
import img4 from "../../../public/myphotos/4.jpg";
import img5 from "../../../public/myphotos/5.jpg";
import "swiper/css/navigation"; 
import { Navigation } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const MainSlider = () => {
  return (
	  <div>
    <div className="w-[40%] py-3 flex justify-center mx-auto ">
      <div className="w-1/2">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
		   loop={true} 
		    navigation={{
              nextEl: ".dot-next",
              prevEl: ".dot-prev", 
            }}
			modules={[Navigation]} 
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>
            <Image
              className="h-[430px] w-[100%] object-cover"
              src={img3}
              alt=""
            />
          </SwiperSlide>
		  <SwiperSlide>
            <Image
              className="h-[430px] w-[100%] object-cover"
              src={img4}
              alt=""
            />
          </SwiperSlide>
		  <SwiperSlide>
            <Image
              className="h-[250px] w-[100%] object-cover"
              src={img5}
              alt=""
            />
          </SwiperSlide>
        </Swiper>

	  <div className="flex justify-center gap-2 mt-7">
		<button className="dot-prev w-4 h-2 rounded-full bg-gray-300"></button>
        <button className="dot-next w-4 h-2 rounded-full bg-gray-300"></button>
	  </div>
	  </div>
      <div className="w-1/2">
        <Image className="h-[250px] object-cover" src={img2} alt="" />
        <Image className="h-[250px] object-cover" src={img1} alt="" />
      </div>
    </div>
	      </div>
  );
};

export default MainSlider;
