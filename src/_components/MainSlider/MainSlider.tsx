"use client";

import React from "react";
import Image from "next/image";
import slider1 from "../../../public/slider-image-1.jpeg";
import slider2 from "../../../public/slider-image-2.jpeg";
import slider3 from "../../../public/slider-image-3.jpeg";
import banner1 from "../../../public/grocery-banner.png";
import banner2 from "../../../public/grocery-banner-2.jpeg";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const MainSlider = () => {
  return (
    <main className="py-5 ">
      <section className=" w-full md-[85%] px-3 md:px-7 lg:px-10 flex flex-wrap ">
        {/* slider */}
        <section className="w-full md:w-2/3 ">
          <Swiper
            pagination={{
              clickable: true,
            }}
            spaceBetween={0}
            slidesPerView={1}
            modules={[Autoplay, Pagination]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            className="mySwiper"
          >
            <SwiperSlide className="cursor-grab">
              <Image
                className="h-[400px] object-cover"
                src={slider2}
                alt="grocery"
              />
            </SwiperSlide>
            <SwiperSlide className="cursor-grab">
              <Image
                className="h-[400px] object-cover"
                src={slider3}
                alt="grocery"
              />
            </SwiperSlide>
            <SwiperSlide className="cursor-grab">
              <Image
                className="h-[400px] object-cover"
                src={slider1}
                alt="grocery"
              />
            </SwiperSlide>
          </Swiper>
        </section>
        {/* static */}
        <section className="w-full md:w-1/3">
          <Image
            className="h-[200px] object-cover"
            src={banner1}
            alt="grocery"
          />
          <Image
            className="h-[200px] object-cover"
            src={banner2}
            alt="grocery"
          />
        </section>
      </section>
    </main>
  );
};

export default MainSlider;
