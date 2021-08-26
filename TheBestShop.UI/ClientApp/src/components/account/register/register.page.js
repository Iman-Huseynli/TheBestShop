import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { NavbarPage } from '../../navbar/navbar.page'
import signupimg from '../img/signup-image.jpg';
import './register.css'
import { register } from '../../../redux/actions/account/accountActions';


export const RegisterPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const formRef = useRef();
    const redirect = useSelector(state => state.generalReducer.redirect);

    const formSubmit = (event) => {
        event.preventDefault();
        const fromData = new FormData(formRef.current);
        dispatch(register(fromData));
    }

    useEffect(() => {
        redirect !== null && history.push(redirect);
    }, [redirect])

    return (
        <div className='h-100 w-100 position-absolute d-flex flex-column justify-content-start bg-light'>
            <div className='w-100 mb-5'>
                <NavbarPage />
            </div>
            <div className="d-flex justify-content-center border rounded shadow p-3 mb-5 mt-5 bg-body rounded">
                <div className="row">
                    <div className="col-md-5 login-image ">
                        <img className='h-100 w-100' src={signupimg} alt="" />
                    </div>
                    <div className="col-md-7">
                        <div className="bg-white bg-gradient text-dark d-flex flex-column align-items-center justify-content-center h-100">
                            <form ref={formRef} className="w-100" onSubmit={formSubmit}>
                                <div className="input-group border-bottom border-dark">
                                    <span className="input-group-text bg-transparent border-0" id="firstname">
                                        <i style={{fontSize: '1.5rem'}} className="bi bi-person-fill"></i>
                                    </span>
                                    <input type="text" className="form-control border-0 my-form-control-input" id='firstName' placeholder="First name..." aria-label="Input group" name='firstName' aria-describedby="firstname" required></input>
                                </div>
                                <div className="input-group border-bottom border-dark">
                                    <span className="input-group-text bg-transparent border-0" id="lastName">
                                        <i style={{fontSize: '1.5rem'}} className="bi bi-person-fill"></i>
                                    </span>
                                    <input type="text" className="form-control border-0 my-form-control-input" id='lastName' placeholder="Last name..." aria-label="Input group" name='lastName' aria-describedby="userName" required></input>
                                </div>
                                <div className="input-group border-bottom border-dark">
                                    <span className="input-group-text bg-transparent border-0" id="userName">
                                        <i style={{fontSize: '1.5rem'}} className="bi bi-person-fill"></i>
                                    </span>
                                    <input type="text" className="form-control border-0 my-form-control-input" id='userName' placeholder="User name..." name='UserName' aria-label="Input group" aria-describedby="userName" required></input>
                                </div>
                                <div className="input-group border-bottom border-dark">
                                    <span className="input-group-text bg-transparent border-0" id="email">
                                        <i style={{fontSize: '1.5rem'}} className="bi bi-envelope-fill"></i>
                                    </span>
                                    <input type="email" className="form-control border-0 my-form-control-input" id='email' placeholder="Email..." aria-label="Input group" name='email' aria-describedby="email" required></input>
                                </div>
                                <div className="input-group border-bottom border-dark">
                                    <span className="input-group-text bg-transparent border-0" id="password">
                                        <i style={{fontSize: '1.4rem'}} className="bi bi-lock-fill"></i>
                                    </span>
                                    <input type="password" className="form-control border-0 my-form-control-input" id='password' placeholder="Password" name='password' aria-label="Input group" aria-describedby="password" required></input>
                                </div>
                                <div className="d-flex flex-row justify-content-between mt-3">
                                    <Link to="/login" className="btn btn-primary btn-lg mt-3 px-4 py-2">Login</Link>
                                    <button type="submit" className="btn btn-info btn-lg mt-3 px-4 py-2">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
