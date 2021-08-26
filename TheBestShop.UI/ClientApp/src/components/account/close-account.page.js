import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { closeAccount } from '../../redux/actions/account/accountActions';


export const CloseAccountPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    
    const redirect = useSelector(state => state.generalReducer.redirect);
    const accountPageUser = useSelector(state => state.accountReducer.accountPageUser);

    useEffect(() => {
        redirect !== null && history.push(redirect);
    }, [redirect])
   
    
    return (
        <div className="w-100">
            <div className="w-100">
            
                <div className="modal fade" id="accountCloseModal" tabIndex="-1" aria-labelledby="accountCloseModal" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-sm">
                        <div className="modal-content">
                        <div className="modal-body text-bold">
                            Are you sure you want to close your account?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button onClick={() => dispatch(closeAccount(accountPageUser && accountPageUser.id))} type="button" data-bs-dismiss="modal" className="btn btn-danger">Remove</button>
                        </div>
                        </div>
                    </div>
                </div>
      
                <div className="border-bottom w-100 p-3 text-center">
                    <h3>Close Account</h3>
                    <h6>Close your account permanently.</h6>
                </div>
                <div className="d-flex flex-column ms-3 p-4 w-100">
                    <div className="w-100 d-flex flex-column align-items-start">
                        <p className="fs-5">Close Your Account</p>
                        <p className="fs-5"><span className='text-dark fw-bold border-bottom'>Warning: </span>If you close your account, you will lose access forever.</p>

                        <button type='submit' className='btn btn-outline-danger p-2' data-bs-toggle="modal" data-bs-target="#accountCloseModal">Close account</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
