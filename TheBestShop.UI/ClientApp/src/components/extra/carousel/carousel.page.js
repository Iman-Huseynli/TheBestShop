import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination, Navigation  } from 'swiper/core';
import carousel1 from './img/carousel1.jpg'
import carousel2 from './img/carousel2.jpg'
import carousel3 from './img/carousel3.jpg'
import carousel4 from './img/carousel4.png'
import carousel5 from './img/carousel5.jpg'
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"
import './carousel.css'


SwiperCore.use([Autoplay, Pagination, Navigation ]);

export const CarouselPage = () => {
    return (
        <div className='container mt-3'>
            <Swiper className='carousel-swiper-container'
                spaceBetween={50}
                centeredSlides={true} 
                loop={true} 
                slidesPerView={1} 
                grabCursor={true} 
                autoplay={{
                    "delay": 3500,
                    "disableOnInteraction": false
                }} 
                pagination={{
                    "clickable": true
                }} 
                navigation={false}
                >
                {[carousel1,carousel2,carousel3,carousel4,carousel5].map((c, i) =>
                    <SwiperSlide className='carousel-swiper-slide' key={i}> <img src={c} alt="" /> </SwiperSlide>
                )}
            </Swiper>
        </div>
    )
}
