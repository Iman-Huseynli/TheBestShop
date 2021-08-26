import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { NavbarPage } from '../../navbar/navbar.page'
import signinimg from '../img/signin-image.jpg';
import './login.css'
import { login } from '../../../redux/actions/account/accountActions';
import { setRedirect } from '../../../redux/actions/general/generalActions';


export const LoginPage = () => {
    const dispatch = useDispatch();
    const formRef = useRef();
    const redirect = useSelector(state => state.generalReducer.redirect);
    
    const formSubmit = (event) => {
        event.preventDefault();
        redirect === '/login' && dispatch(setRedirect(null));
        const formData = new FormData(formRef.current);
        dispatch(login(formData));
    }

    return (
        <div className='h-100 w-100 position-absolute d-flex flex-column justify-content-start bg-light'>
            <div className='w-100 mb-5'>
                <NavbarPage />
            </div>
            <div className="d-flex justify-content-center border rounded shadow p-3 mb-5 mt-5 bg-body rounded">
                <div className="row">
                    <div className="col-md-5 login-image ">
                        <img className='h-100 w-100' src={signinimg} alt="" />
                    </div>
                    <div className="col-md-7">
                        <div className="bg-white bg-gradient text-dark d-flex flex-column align-items-center justify-content-center h-100">
                            <form ref={formRef} className="w-100" onSubmit={formSubmit}>
                                <div className="input-group input-group-border position-relative">
                                    <span className="input-group-text bg-transparent border-0" id="email">
                                        <i style={{fontSize: '1.5rem'}} className="bi bi-person-fill"></i>
                                    </span>
                                    <input type="email" name='email' className="form-control my-form-control-input" id='email' placeholder="Email..." aria-label="Input group" aria-describedby="email" required></input>
                                </div>
                                <div className="input-group input-group-border mt-2">
                                    <span className="input-group-text bg-transparent border-0" id="password">
                                        <i style={{fontSize: '1.4rem'}} className="bi bi-lock-fill"></i>
                                    </span>
                                    <input type="password" name='password' className="form-control  my-form-control-input" id='password' placeholder="Password" aria-label="Input group" aria-describedby="password" required></input>
                                    <span className='my-form-control-input-border'></span>
                                </div>
                                <button type="submit" className="btn btn-info btn-lg mt-3 px-4 py-1">Login</button>

                                <div className='text-center mt-5'>
                                    <p>New to TheBestShop?</p>
                                    <Link to='/register' className="btn btn-light border border-2 w-100">Register</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
