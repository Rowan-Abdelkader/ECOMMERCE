"use client"
import { Import } from 'lucide-react'
import React from 'react' 
 import { Swiper, SwiperSlide } from "swiper/react";
 import "swiper/css";
import "swiper/css/autoplay";
import { category } from '@/types/categories.t';
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";



const SwiperCategory = ({categoryProps}: {categoryProps: category[]}) => {
  return (
	<div className='w-full'>
 <Swiper
          spaceBetween={0}
          slidesPerView={"auto"}
		    loop={true} 
		  autoplay={{
  delay: 2500,
  disableOnInteraction: false,
}}
navigation={{
  nextEl: ".main-next", 
  prevEl: ".main-prev", 
  
}}
modules={[Navigation]}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
			{categoryProps.map((category  , idx) => (
		  <SwiperSlide key={idx} className="!w-auto !m-0">
			<img src={category.image} alt={category.name}   className='w-[259px] h-[250px] object-cover' />
			 <h3 className=' mt-2 font-medium text-2xl '>
              {category.name}
            </h3>
		  </SwiperSlide>
		))}
      </Swiper>
	  <div className="flex justify-center gap-2 mt-6">
        <button className="main-next w-4 h-2 rounded-full bg-gray-300"></button>
        <button className="main-prev w-4 h-2 rounded-full bg-gray-300"></button>
      </div>
	</div>
	
  )
}

export default SwiperCategory