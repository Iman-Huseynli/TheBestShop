import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/actions/cart/cartActions';
import { addOrder, addOrderItem, getOrders, removeFromOrder, setOrderSum } from '../../redux/actions/order/orderActions';
import { NavbarPage } from '../navbar/navbar.page';
import './order.css'


export const OrderPage = () => {
    let orders = useSelector(state => state.orderReducer.orders);
    let orderCount = useSelector(state => state.orderReducer.orderCount);
    let orderSum = useSelector(state => state.orderReducer.orderSum);
    
    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    const [selectedMonth, setSelectedMonth] = useState();
    const [selectedYear, setSelectedYear] = useState();
    const [removableOrder, setRemovableOrder] = useState();

    let orderRef = useRef();

    const dispatch = useDispatch();
    
    const formSubmit = (e) => {
        e.preventDefault();
        let orderForm = new FormData(orderRef.current);
        let temp = [];
        orders && orders.map(c => temp.push({ id: c.product.id, name: c.product.name, price: c.product.price, quantity: c.quantity }));
        orderForm.set('OrderModels',JSON.stringify(temp));
        orderForm.append('totalPrice', orderSum);
        dispatch(addOrder(orderForm));
    }
    
    useEffect(() => {
        dispatch(getOrders());
        dispatch(setOrderSum());
    }, [])

    return (
        <div>
            <NavbarPage/>
            <div className="container">

                <form ref={orderRef} onSubmit={formSubmit}>
                    <div style={{ marginTop: "7%", marginBottom: "7%" }} className="d-flex order-container">
                        <div className="d-flex flex-column order-left-container">
                            <h4><strong>Billing Details</strong> </h4>
                            <div className='w-75 my-3' style={{ borderBottom: "1px solid rgb(133,133,133)" }}></div>

                            <div className="d-flex mt-4 w-100">
                                <div className='d-flex flex-column w-50 me-2'>
                                    <label>First Name</label>
                                    <input name='firstName' type="text" className="form-control" id="FirstName" ></input>
                                </div>
                                <div className='d-flex flex-column ms-4 w-50'>
                                    <label>Last Name</label>
                                    <input name='lastName' type="text" className="form-control" id="LastName" ></input>
                                </div>
                            </div>
                            <div className="d-flex flex-column w-100 mt-3">
                                <label>Country / State</label>
                                <input name='country' type="text" className="form-control" id="Country" ></input>
                            </div>
                            <div className="d-flex flex-column w-100 mt-3">
                                <label>City</label>
                                <input name='city' type="text" className="form-control" id="City" ></input>
                            </div>
                            <div className="d-flex flex-column w-100 mt-3">
                                <label>Town / City</label>
                                <input name='town' type="text" className="form-control" id="Town" ></input>
                            </div>
                            <div className="d-flex flex-column w-100 mt-3">
                                <label>Address</label>
                                <textarea name='address' type="text" className="form-control" id="Address" ></textarea>
                            </div>
                            <div className="d-flex flex-column w-100 mt-3">
                                <label>Postcode / ZIP</label>
                                <input name='postcode' type="text" className="form-control" id="Postcode" ></input>
                            </div>
                            <div className="d-flex w-100 mt-3">
                                <div className='d-flex flex-column w-50'>
                                    <label>Phone</label>
                                    <input name='phone' type="text" className="form-control" id="Phone" ></input>
                                </div>
                                <div className='d-flex flex-column w-50 ms-4'>
                                    <label>Email</label>
                                    <input name='email' type="email" className="form-control" id="Email" ></input>
                                </div>
                            </div>
                            <div className="d-flex flex-column w-100 mt-3">
                                <label>Order notes</label>
                                <textarea name='orderNote' type="text" className="form-control" id="Ordernote" ></textarea>
                            </div>
                        </div>

                        <div className="d-flex flex-column order-right-container ms-3">
                            <div style={{ backgroundColor: "rgb(245,245,245)", width: '90%'}}>
                                <h4 className="ps-3 pt-4"><strong>Your Carts</strong></h4>
                                <div className='w-100 d-flex justify-content-center mt-4'>
                                    <div className='mx-3 w-100' style={{ borderBottom: "1px solid rgb(133,133,133)" }}></div>
                                </div>

                                
                                <div className="modal fade" id="orderRemoveModal" tabIndex="-1" aria-labelledby="orderRemoveModal" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered modal-sm">
                                        <div className="modal-content">
                                        <div className="modal-body text-bold">
                                            Are you sure you want to move to Trash?
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button onClick={() => dispatch(removeFromOrder(removableOrder))} type="button" data-bs-dismiss="modal" className="btn btn-danger">Remove</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex flex-row justify-content-between px-4 pt-4 pb-1 w-100">
                                    <h5 className='w-50'><strong>Products</strong></h5>
                                    <h5 className='w-50 ms-5'> <strong>Price</strong> </h5>
                                </div>
                                <div className="order-right-container-item">
                                    {
                                        orders && orders.length > 0 && orders.map((c, i) => (
                                            <div key={i} className="d-flex border-bottom border-2 flex-row justify-content-between align-items-center ps-3 pe-2 py-2 w-100 ">
                                                <div className='w-50' style={{ fontWeight: "bolder" }}>{c.product.name} -- <small className='badge bg-primary'>x {c.quantity}</small></div>
                                                <div style={{width: '20%'}} className='ms-3'>{(c.quantity * c.product.price).toFixed(2)} $</div>

                                                <i onClick={() => dispatch(addToCart(c.product.id))} style={{fontSize: '2rem', width: '10%'}}  data-bs-toggle="tooltip" data-bs-placement="bottom" title="Add to favourite" type="button" className="bi bi-heart"></i>

                                                <div style={{width: '10%'}} className="d-flex flex-column">
                                                    <button onClick={() => dispatch(removeFromOrder({productId: c.product.id, quantity: 1}))} type='button' id={c.product.id}  className='btn btn-secondary ms-2 py-0'>-</button>
                                                    <span className='ms-2 py-0'>{c.quantity}</span>
                                                    <button onClick={() => dispatch(addOrderItem(c.product, 1))} type='button' id={c.product.id}  className='btn btn-info ms-2 py-0'>+</button>
                                                </div>
                                                <button onClick={() => setRemovableOrder({productId: c.product.id, quantity: c.quantity})} data-bs-toggle="modal" data-bs-target="#orderRemoveModal" type='button' id={c.product.id} style={{width: '5%'}} className='btn btn-outline-danger px-0 py-0'>X</button>
                                            </div>
                                        ))
                                    }
                                </div>
                                
                                <div className='w-100 d-flex justify-content-center my-4'>
                                    <div className='mx-4 w-100' style={{ borderBottom: "1px solid rgb(133,133,133)" }}></div>
                                </div>
                                
                                <div className="d-flex flex-row justify-content-between px-4">
                                    <h5><strong>Total</strong></h5>
                                    <p className='text-danger fs-4'>{orderSum} $</p>
                                </div>
                                
                                <div className="d-flex justify-content-center">
                                    <button type="submit" className="btn btn-success btn-lg w-50 my-3">Place Order</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
