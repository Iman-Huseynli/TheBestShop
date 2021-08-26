import React, { useEffect, useState } from 'react'
import './favourite.css'
import { NavbarPage } from '../navbar/navbar.page'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCarts, getCartsDetails, removeFromCart } from '../../redux/actions/cart/cartActions'
import { addOrderItem } from '../../redux/actions/order/orderActions'

export const FavouritePage = () => {
    const dispatch = useDispatch();
    const carts = useSelector(state => state.cartReducer.carts);
    const cartCount = useSelector(state => state.cartReducer.cartCount);

    const [removableCartId, setRemovableCartId] = useState();

    useEffect(() => {
        dispatch(getCarts());
        dispatch(getCartsDetails());
    },[cartCount])

    return (
        <div style={{minHeight: '80vh'}}>
            <NavbarPage/>
            <div className='bg-danger w-100'>
                <div className="d-flex flex-column text-white ">
                    <div className="d-flex flex-row mt-4 mb-3">
                        <i style={{fontSize: '2rem', marginBottom: '.6rem'}} className="bi bi-lock"></i>
                        <h4 className='me-3 ms-2'>Private  • </h4>
                        <h4>Iman huseynli</h4>
                    </div>
                    <h2 className=''>Your Shopping list</h2>
                    <h4 className='my-4'>{cartCount} products</h4>
                </div>
            </div>

            <div className="modal fade" id="cartRemoveModal" tabIndex="-1" aria-labelledby="cartRemoveModal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-sm">
                    <div className="modal-content">
                    <div className="modal-body text-bold">
                        Are you sure you want to move to Trash?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={() => dispatch(removeFromCart(removableCartId))} type="button" data-bs-dismiss="modal" className="btn btn-danger">Remove</button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="container w-100">
                <div className='d-flex flex-row cart-product-container'>
                { carts && carts.length > 0 && carts.map((c, i) =>
                    <div key={i} className='d-flex flex-column mt-2 cart-product-main border mx-1'>
                        <i onClick={() => setRemovableCartId(c.id)} data-bs-toggle="modal" data-bs-target="#cartRemoveModal" className="bi bi-x-octagon-fill cart-remove-btn"></i>
                        <Link className='d-content text-dark' to={`/product-detail/${c.id}`}>
                            <p className='mt-2'>{c.name}</p>
                            <img src={`${c.image}${c.id}`} alt="" />
                        </Link>
                        <div className="flex-row cart-product-footer">
                            <h4 className='cart-product-price text-danger'>{c.price} $</h4>
                            <div className='flex-row cart-product-btn'>
                                <button onClick={() => dispatch(addOrderItem(c, 1))} id={c.id} className='btn btn-success'>Add to cart</button>
                            </div>
                        </div>
                    </div>
                )}
                </div>
            </div>
        </div>
    )
}
