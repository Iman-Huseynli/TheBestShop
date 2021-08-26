import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CarouselPage } from '../extra/carousel/carousel.page'
import { ProductCarouselPage } from '../extra/product/product-carousel.page'
import { NavbarCategoryPanelPage } from '../navbar/navbar-category-panel.page'
import { NavbarPage } from '../navbar/navbar.page'
import { getProducts } from '../../redux/actions/product/productActions';
import { ProductPage } from '../product/product.page'
import { setRedirect } from '../../redux/actions/general/generalActions'


export const HomePage = () => {
    const dispatch = useDispatch();
    const bestPrice = useSelector(state => state.productReducer.bestPrice);
    const bestSelling = useSelector(state => state.productReducer.bestSelling);
    const mostViewed = useSelector(state => state.productReducer.mostViewed);
    const redirect = useSelector(state => state.generalReducer.redirect);

    useEffect(() => {
        redirect !== null && dispatch(setRedirect(null));
        dispatch(getProducts());
    },[dispatch])

    return (
        <div>
            <NavbarPage/>
            <NavbarCategoryPanelPage/>
            <CarouselPage/>
            <div className='mt-5 mb-3'>
                <div className='fs-1 fw-bold font-monospace product-swiper-main'>
                    Best Price, Super Offer {'>'} <Link className='btn btn-info' to='shop'>All</Link>
                </div>
                <ProductCarouselPage products={bestPrice}/>
            </div>
            <div className='mt-5 mb-3'>
                <div className='fs-1 fw-bold font-monospace product-swiper-main'> Most-viewed items </div>
                <ProductCarouselPage products={mostViewed}/>
            </div>
            <div className='mt-5 mb-3'>
                <div className='fs-1 fw-bold font-monospace product-swiper-main'> Best selling items </div>
                <ProductCarouselPage products={bestSelling}/>
            </div>
            <div className='mt-5 mb-3'>
                <div className='fs-1 fw-bold font-monospace product-swiper-main'> Featured products </div>
                <ProductPage/>
            </div>
        </div>
    )
}
