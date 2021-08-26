import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getUserData } from '../../redux/actions/account/accountActions';
import { NavbarPage } from '../navbar/navbar.page';
import { ChangePasswordPage } from './change-password.page';
import { CloseAccountPage } from './close-account.page';
import { ProfilePage } from './profile.page';


export const AccountPage = () => {
    const dispatch = useDispatch();
    const [currentAccountPage, setCurrentAccountPage] = useState("profile");

    const getAccountPage = () => {
        switch (currentAccountPage) {
            case 'profile':
                return(
                    <ProfilePage/>
                )
            case 'change-password':
                return(
                    <ChangePasswordPage/>
                )
            case 'close-account':
                return(
                    <CloseAccountPage/>
                )
            default:
                return(
                    <ProfilePage/>
                )
        }
    }

    useEffect(() => {
        dispatch(getUserData());
    })
    
    return (
        <div>
            <NavbarPage/>

             <div className="container mt-4">
                <div className="row border">
                    <div className="col-md-2 border">
                        <h3 className='text-center mb-4 mt-4 border-bottom pb-2'>Admin</h3>
                        <div className="list-group">
                            <li onClick={() => setCurrentAccountPage('profile')} className={`list-group-item list-group-item-action list-group-item-light border-0 cursor-pointer ${currentAccountPage === 'profile' && 'active'}`}>Profile</li>
                            <li onClick={() => setCurrentAccountPage('change-password')} className={`list-group-item list-group-item-action list-group-item-light border-0 cursor-pointer ${currentAccountPage === 'change-password' && 'active'}`}>Change password</li>
                            <li onClick={() => setCurrentAccountPage('close-account')} className={`list-group-item list-group-item-action list-group-item-light border-0 cursor-pointer ${currentAccountPage === 'close-account' && 'active'}`}>Close account</li>
                        </div>
                    </div>
                    <div className="col-md-10 border d-flex flex-column">
                        {
                            getAccountPage()
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
