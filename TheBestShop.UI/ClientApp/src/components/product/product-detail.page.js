import React, { useEffect, useState } from 'react'
import './product.css'
import { ProductCarouselPage } from '../extra/product/product-carousel.page'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { NavbarPage } from '../navbar/navbar.page'
import { getProductById } from '../../redux/actions/product/productActions';
import { addToCart } from '../../redux/actions/cart/cartActions';
import { addOrderItem } from '../../redux/actions/order/orderActions';
import { NavbarCategoryPanelPage } from '../navbar/navbar-category-panel.page';

export const ProductDetailPage = () => {
    const { id } = useParams('id');
    const dispatch = useDispatch();
    const product = useSelector(state => state.productReducer.product);
    const detailFeatured = useSelector(state => state.productReducer.detailFeatured);

    const [count, setCount] = useState(1);
    const [rating, setRating] = useState(`${Math.floor(Math.random() * 1000)},${Math.floor(Math.random() * 1000)} ratings`);

    const setCartCount = (operator) => {
        switch (operator) {
            case '-':
                count > 0 && count !== 1 && setCount(count - 1);
                break;
            case '+':
                product.quantity > count && setCount(count + 1);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        dispatch(getProductById(id));
    }, [])

    return (
        <div>
            <NavbarPage/>
            <NavbarCategoryPanelPage/>
            {
                product !== null &&
                    <div className="container my-5">
                        <div className="row">
                            <div className="col-md-5 product-detail-img-main">
                                <div className="w-100 ">
                                    <img className=' w-100 ' src={`${product.image}${product.id}`} alt={product.name} />
                                </div>
                            </div>
                            <div className="col-md-7 flex-column detail-page-main px-5 pt-3">
                            <h3 className='border-bottom pb-1'>{product.name}</h3>
                            <h5 className='text-primary'>{product.companyName}</h5>
                            <div>
                                {[1, 2, 3, 4, 5].map((x, v) => x <= product.quality ?
                                    <i key={v} style={{ color: '#ffbc00', fontSize: '1.1rem' }} className="bi bi-star-fill"></i> :
                                    <i key={v} style={{ color: '#ffbc00', fontSize: '1.1rem' }} className="bi bi-star"></i>
                                )} <span className='ms-5'>{rating}</span>
                            </div>
                                <h4 className='mt-2 text-danger'>{product.price} $</h4>
                                <div className="d-flex w-100 mt-2">
                                    <h5 className=''>Availability:  <span className={`ms-2 badge ${product.availability === true ? 'bg-primary' : 'bg-danger'}`}>{product.availability === true ? ' In stock' : " Currently unavailable"}</span></h5>
                                </div>
                                <p className='mt-4 w-100 border-bottom'></p>

                                <div className="d-flex justify-content-evenly w-100">
                                    <div className="d-flex me-2">
                                        <button onClick={() => dispatch(addToCart(id))} className="btn btn-outline-primary ms-3">Add to favourite</button>
                                    </div>

                                    <div className="d-flex ms-2">
                                        <button onClick={() => setCartCount('-')} style={{width: '3rem'}} className="btn btn-warning text-center fs-3">-</button>
                                        <span className='flex-row mx-3 fs-4'>{count}</span>
                                        <button onClick={() => setCartCount('+')} style={{width: '3rem'}} className="btn btn-success text-center fs-3">+</button>
                                    <button onClick={() => dispatch(addOrderItem(product, count))} className="btn btn-outline-info ms-3">Add to list</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className='my-5 d-flex flex-column justify-content-center w-100 mb-4'>
                            <div className="card card-body bg-dark">
                                <p className="text-light">{product.description}</p>
                            </div>
                        </div>
                    </div>
            }
            <div className='my-5'>
                <div className='fs-1 fw-bold font-monospace product-swiper-main'> Featured items you may like </div>
                <ProductCarouselPage products={detailFeatured}/>
            </div>
        </div>
    )
}
