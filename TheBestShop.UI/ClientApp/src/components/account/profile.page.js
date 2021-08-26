import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeUserData } from '../../redux/actions/account/accountActions';


export const ProfilePage = () => {
    let formRef = useRef();
    const dispatch = useDispatch();
    const accountPageUser = useSelector(state => state.accountReducer.accountPageUser)
   
    const onSubmitForm = (e) => {
        e.preventDefault();
        let data = new FormData(formRef.current);
        dispatch(changeUserData(data));
    }

    return (
        <div className="w-100">
            <div className="w-100">
                <div className="border-bottom w-100 p-3 text-center">
                    <h3>Public profile</h3>
                    <h6>Add information about yourself.</h6>
                </div>
                <div className="d-flex flex-column ms-3 p-4 w-100">
                    <form className="w-50 d-flex flex-column" ref={formRef} onSubmit={onSubmitForm}>
                        <p className="border-bottom mb-4 fs-5 align-self-start">Basics:</p>
                        <input type="hidden" defaultValue={accountPageUser && accountPageUser.id} name="id"/>
                        <div className="input-group input-group-lg mb-3">
                            <input type="text" className="form-control" defaultValue={accountPageUser && accountPageUser.firstName} placeholder="First name" name="firstname" aria-describedby="basic-addon1"></input>
                        </div>
                        <div className="input-group input-group-lg mb-3">
                            <input type="text" className="form-control" defaultValue={accountPageUser && accountPageUser.lastName} placeholder="Last name" name="lastname" aria-describedby="basic-addon1"></input>
                        </div>
                        <div className="input-group input-group-lg mb-3">
                            <input type="text" className="form-control" defaultValue={accountPageUser && accountPageUser.userName} placeholder="Username" name="username" aria-describedby="basic-addon1"></input>
                        </div>

                        <button type='submit' className='btn btn-success align-self-end'>Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
