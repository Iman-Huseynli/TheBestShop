import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../redux/actions/account/accountActions';


export const ChangePasswordPage = () => {
    let formRef = useRef();
    const dispatch = useDispatch();
    const accountPageUser = useSelector(state => state.accountReducer.accountPageUser)
   
    const onSubmitForm = (e) => {
        e.preventDefault();
        let data = new FormData(formRef.current);
        dispatch(changePassword(data));
    }
    return (
        <div className="w-100">
            <div className="w-100">
                <div className="border-bottom w-100 p-3 text-center">
                    <h3>Account</h3>
                    <h6>Edit your account settings and change your password here.</h6>
                </div>
                {accountPageUser && accountPageUser.email &&
                    <div className="border-bottom d-flex flex-column w-100 p-3">
                        <div className="w-50">
                            <p className="fs-5">Email:</p>
                            <h6 className='border p-2'>Your email address is: {accountPageUser.email}</h6>
                        </div>
                    </div>}
                <div className="d-flex flex-column p-4 w-100">
                    <form className="w-50 d-flex flex-column" ref={formRef} onSubmit={onSubmitForm}>
                        <p className="border-bottom mb-4 fs-5 align-self-start">Password:</p>
                        <input type="hidden" defaultValue={accountPageUser && accountPageUser.id} name="id"/>
                        <div className="input-group input-group-lg mb-3">
                            <input type="text" className="form-control" placeholder="Old password" name="password" aria-describedby="basic-addon1"></input>
                        </div>
                        <div className="input-group input-group-lg mb-3">
                            <input type="text" className="form-control" placeholder="New password" name="newpassword" aria-describedby="basic-addon1"></input>
                        </div>
                        <div className="input-group input-group-lg mb-3">
                            <input type="text" className="form-control" placeholder="Re-type new password" name="renewpassword" aria-describedby="basic-addon1"></input>
                        </div>

                        <button type='submit' className='btn btn-success align-self-end'>Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
