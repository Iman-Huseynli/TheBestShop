import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import './navbar.css'
import { logout } from '../../redux/actions/account/accountActions';
import { setSearchValueFilter } from '../../redux/actions/shop/shopActions';


export const NavbarPage = () => {
    const isAuth = useSelector(state => state.accountReducer.isAuth);
    const isAdmin = useSelector(state => state.accountReducer.isAdmin);
    const cartCount = useSelector(state => state.cartReducer.cartCount);
    const orderCount = useSelector(state => state.orderReducer.orderCount);
    const searchValueFilter = useSelector(state => state.shopReducer.searchValueFilter);

    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    
    const formSubmit = (e) => {
        e.preventDefault();
        dispatch(setSearchValueFilter(searchValue));
        history.push({pathname: '/shop'});
    }
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand fs-2" to="/">The<span style={{ color: 'red' }}>Best</span>Shop</Link>
                    
                    <div className="navbar-order-toggle">
                        <button className="navbar-toggler btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse navbar-order-search w-100" id="navbar">
                        <form onSubmit={formSubmit} className="d-flex mx-auto w-75">
                            <input defaultValue={searchValueFilter} onChange={(e) => setSearchValue(e.target.value)} className="form-control me-2" placeholder="Search..." aria-label="Search"></input>
                            <button className="btn btn-success" type="submit">Search</button>
                        </form>
                    </div>    
                    <div className="collapse navbar-collapse navbar-order-account flex-grow-0" id="navbar">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {
                            isAuth === false ?
                                <div className='d-content'>
                                    <li className="nav-item">
                                        <Link className="nav-link btn-lg" aria-current="page" to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link btn-lg" to="/register">Register</Link>
                                    </li>
                                </div> :
                                <div className='d-content'>
                                {isAdmin === true &&
                                    <li className="nav-item">
                                        <Link className="nav-link btn-lg" to="/admin">Admin</Link>
                                    </li>
                                }
                                    <li className="nav-item">
                                        <Link className="nav-link btn-lg" to="/account">Account</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link onClick={() => dispatch(logout())} className="nav-link btn-lg" to="/logout">Logout</Link>
                                    </li>
                                </div>
                        }
                        </ul>              
                    </div>
                    
                    <div className="d-flex flex-row navbar-order-cart me-4">
                        <Link className='me-1 position-relative' to='/favourite'>
                            <span style={{top: '15%'}} className="position-absolute start-100 translate-middle badge rounded-pill bg-danger">{cartCount <= 0 ? "" : cartCount > 100 ? '100+' : cartCount }</span>
                            <i style={{color: '#ffffff', fontSize: '2rem'}} className="bi bi-heart"></i>
                        </Link>
                        <Link className='ms-4 mb-1 position-relative' to='/order'>
                            <span style={{top: '15%'}} className="position-absolute start-100 translate-middle badge rounded-pill bg-danger">{orderCount <= 0 ? "" : orderCount > 100 ? '100+' : orderCount}</span>
                            <i style={{color: '#ffffff', fontSize: '2rem'}} className="bi bi-cart-fill"></i>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}
