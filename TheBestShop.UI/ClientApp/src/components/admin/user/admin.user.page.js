import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { getUserByIdWithRoles } from '../../../redux/actions/account/accountActions';
import { addOrUpdateData, getRoles } from '../../../redux/actions/admin/adminActions';
import { NavbarPage } from '../../navbar/navbar.page'

export const AdminUserPage = (props) => {
    const { id } = useParams('id');
    let formRef = useRef();
    const { state } = useLocation('state');
    const history = useHistory();

    const dispatch = useDispatch();
    const user = useSelector(state => state.accountReducer.user);
    const roles = useSelector(state => state.adminReducer.roles);
    const redirect = useSelector(state => state.generalReducer.redirect);
    
    const [addRoleToSelectedRole, setAddRoleToSelectedRole] = useState(0);
    const [selectedRole, setSelectedRole] = useState([]);

    const formSubmit = (event) => {
        event.preventDefault();
        let allRoles = [];
        const formData = new FormData(formRef.current);
        id && selectedRole.length === 0 && user.userOperationClaims.map(c => allRoles.push(c.operationClaimsId));
        id ? selectedRole.length === 0 ? formData.append("roles", allRoles) : formData.append("roles", selectedRole) : formData.append("roles", selectedRole);
        dispatch(addOrUpdateData(state.tableName, formData, id));
    }

    const changeRoleHandler = (e) => {
        let allRoles = [];
        id && addRoleToSelectedRole === 0 ? user && user.userOperationClaims && user.userOperationClaims.length > 0 &&
        user.userOperationClaims && user.userOperationClaims.map(c => allRoles.push(c.operationClaimsId)) : allRoles = selectedRole;
        addRoleToSelectedRole === 0 && setAddRoleToSelectedRole(1);
        let index = allRoles.findIndex(c => c == e.target.id);
        index < 0 ? allRoles.push(e.target.id) : allRoles.splice(index, 1);
        setSelectedRole(allRoles);
    }

    useEffect(() => {
        redirect !== null && history.push(redirect);
        dispatch(getRoles());
        id && dispatch(getUserByIdWithRoles(id));
    },[redirect])
    
    return (
        <div>
            <NavbarPage/>

            <form className="container" ref={formRef} onSubmit={formSubmit}>
                <div className="row">
                    <div className="col-md-8 p-4">
                        <div className="col-md-8 mt-5">
                            <div className="d-flex flex-column align-items-start">
                                <label>Email</label>
                                <input type="email" defaultValue={user && user.email} className="form-control" name='email' id="email" ></input>
                            </div>
                        </div>
                        <div className="col-md-8 mt-5">
                            <div className="d-flex flex-column align-items-start">
                                <label>Username</label>
                                <input type="text" defaultValue={user && user.userName} className="form-control" name='userName' id="userName" ></input>
                            </div>
                        </div>
                        <div className="col-md-8 mt-5">
                            <div className="d-flex flex-column align-items-start">
                                <label>First Name</label>
                                <input type="text" defaultValue={user && user.firstName} className="form-control" name='firstName' id="firstName" ></input>
                            </div>
                        </div>
                        <div className="col-md-8 mt-5">
                            <div className="d-flex flex-column align-items-start">
                                <label>Last Name</label>
                                <input type="text" defaultValue={user && user.lastName} className="form-control" name='lastName' id="lastName" ></input>
                            </div>
                        </div>
                        <div className="col-md-8 mt-5">
                            <div className="d-flex flex-column align-items-start">
                                <label>Password</label>
                                <input type="password" className="form-control" name='password' id="password" required></input>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-4 mt-4 p-4">
                        <div className='pb-3' style={{ backgroundColor: "rgb(245,245,245)" }}>
                            <h4 className="ps-3 pt-4"><strong>Categories</strong></h4>
                            <div className='w-100 d-flex justify-content-center mt-3 pb-4'>
                                <div className='mx-3 w-100' style={{ borderBottom: "1px solid rgb(133,133,133)" }}></div>
                            </div>
                            <div style={{maxHeight: '30rem', overflowY: 'auto'}}>
                            {
                                roles && roles.length > 0 && roles.map((v, i) => (
                                    <div key={i} className="d-flex flex-column align-items-start px-4">
                                    { id && user && user.userOperationClaims && user.userOperationClaims.length > 0 &&
                                        user.userOperationClaims.findIndex(c => c.operationClaimsId === v.id) >= 0 ?
                                        <div className="form-check">
                                            <input onClick={changeRoleHandler} defaultChecked={true} name='role' className="form-check-input" type="checkbox" id={v.id}></input>
                                            <label className="form-check-label" htmlFor={v.id}>
                                                {v.name}
                                            </label>
                                        </div> :
                                        <div className="form-check">
                                            <input onClick={changeRoleHandler} name='role' className="form-check-input" type="checkbox" id={v.id}></input>
                                            <label className="form-check-label" htmlFor={v.id}>
                                                {v.name}
                                            </label>
                                        </div>
                                    }
                                    </div>))
                            }</div>
                            <div className='w-100 d-flex justify-content-center my-4'>
                                <div className='mx-4 w-100' style={{ borderBottom: "1px solid rgb(133,133,133)" }}></div>
                            </div>

                            <div className="d-flex justify-content-center mb-2">
                                <button type='submit' className="btn btn-success">{id ? 'Update user' : 'Create user'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
