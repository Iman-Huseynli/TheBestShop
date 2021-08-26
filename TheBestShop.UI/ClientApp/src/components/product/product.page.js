import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './product.css'
import { addToCart } from '../../redux/actions/cart/cartActions';
import { addOrderItem } from '../../redux/actions/order/orderActions';
import { Link } from 'react-router-dom';


export const ProductPage = () => {
    const dispatch = useDispatch();
    const featuredProducts = useSelector(state => state.productReducer.featuredProducts);

    return (
        <div className='product-main'>
            <div className="row row-cols-1 row-cols-md-3">
                {featuredProducts && featuredProducts.length> 0 && featuredProducts.map((c, i) =>
                    <div key={i} className="col mb-3">
                        <div className="card h-100">
                            <Link className="d-content" to={`/product-detail/${c.id}`}>
                                <img src={`${c.image}${c.id}`} className="card-img-top product-card-image" alt="..."></img>
                                <div className="card-body text-dark">
                                    <h5 className="card-title product-page-card-header">{c.name}</h5>
                                    <p className="card-text text-center fs-3 text-danger">{c.price} $</p>
                                </div>
                            </Link>
                                <div className="card-footer flex-row">
                                    <button onClick={() => dispatch(addToCart(c.id))} className="btn btn-primary me-2">Add to favourite</button>
                                    <button onClick={() => dispatch(addOrderItem(c.id, 1))} className="btn btn-success">Add to cart</button>
                                </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
