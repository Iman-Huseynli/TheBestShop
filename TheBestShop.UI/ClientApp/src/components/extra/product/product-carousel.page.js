import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper/core';
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"
import './product-carousel.css'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/actions/cart/cartActions';
import { addOrderItem } from '../../../redux/actions/order/orderActions';


SwiperCore.use([ Autoplay, Pagination, Navigation ]);

export const ProductCarouselPage = (props) => {
    const dispatch = useDispatch();

    return (
        <div className='mt-3 mb-5 mx-5 product-swiper-main'>
            <Swiper className='product-swiper-container'
                spaceBetween={20}
                centeredSlides={true}
                loop={true}
                slidesPerView={4}
                grabCursor={true}
                coverflowEffect={{
                    "rotate": 50,
                    "stretch": 0,
                    "depth": 100,
                    "modifier": 1,
                    "slideShadows": true
                }}
                autoplay={{
                    "delay": 2000,
                    pauseOnMouseEnter: true,
                    "disableOnInteraction": false
                }}
                pagination={{
                    "clickable": true
                }}
                navigation={true}
                >
                {props.products && props.products.map((c, i) =>
                    <SwiperSlide className='product-swiper-slide flex-column' key={i}>
                        <Link style={{display: 'contents'}} to={`/product-detail/${c.id}`}>
                            <div className='swiper-slide-header mb-2 flex-row'>
                                <p className='mt-2'>{c.name}</p>
                            </div>
                            <img src={`${c.image}${c.id}`} alt="" />
                        </Link> 
                            <div className="swiper-slide-footer flex-row">
                                <div className='swiper-slide-footer-price my-2'>{c.price} $</div>
                                <div className='flex-row'>
                                    <button id={c.id} onClick={() => dispatch(addToCart(c.id))} className='btn btn-outline-primary me-2'>Add to favourite</button>
                                    <button onClick={() => dispatch(addOrderItem(c, 1))} id={c.id} className='btn btn-outline-success'>Add to cart</button>
                                </div>
                            </div>
                    </SwiperSlide>
                )}
            </Swiper>
        </div>
    )
}
