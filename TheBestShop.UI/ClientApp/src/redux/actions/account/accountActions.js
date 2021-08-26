import * as accountTypes from './accountTypes';
import * as api from '../../../api/api'
import { getCarts } from '../cart/cartActions';
import { setRedirect, setToast } from '../general/generalActions';


export const register = (formData) => async (dispatch) => {
    try {
        const { data } = await api.postData('auth/register', formData);
        if(data.isSuccess === true){
            dispatch(setToast(data.message));
            return dispatch(setRedirect('/login'));
        }
        else{
            dispatch(setToast(data.message, 'danger'));
        }
    } catch ({ response }) {
        response && response.data && dispatch(setToast(response.data.Message && response.data.Message, 'danger'));
    }
}

export const login = (formData) => async (dispatch) => {
    try {
        const { data } = await api.postData('auth/login', formData);
        if(data.isSuccess === true){
            api.setAuthToken(data.data);
            dispatch(getCarts());
            dispatch(checkIsAdmin());
            dispatch(setToast(data.message));
            return dispatch({type: accountTypes.LOGIN, payload: true});
        }
        else{
            dispatch(setToast(data.message, 'danger'));
        }
    } catch ({ response }) {
        response && response.data && dispatch(setToast(response.data.Message && response.data.Message, 'danger'));
    }
}

export const getUserData = (formData) => async (dispatch) => {
    try {
        const { token } = await api.getAuthToken();
        const { data } = await api.getData('auth/getuserdata', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if(data.isSuccess === true){
            return dispatch({type: accountTypes.GET_USER, payload: data.data});
        }
        else{
            dispatch(setToast(data.message, 'danger'));
        }
    } catch ({ response }) {
        response && response.data && dispatch(setToast(response.data.Message && response.data.Message, 'danger'));
    }
}

export const changeUserData = (formData) => async (dispatch) => {
    try {
        const { token } = await api.getAuthToken();
        const { data } = await api.postData('auth/changeuserdata', formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if(data.isSuccess === true){
            return dispatch(setToast(data.message, 'info'));
        }
        else{
            dispatch(setToast(data.message, 'danger'));
        }
    } catch ({ response }) {
        response && response.data && dispatch(setToast(response.data.Message && response.data.Message, 'danger'));
    }
}

export const changePassword = (formData) => async (dispatch) => {
    try {
        const { token } = await api.getAuthToken();
        const { data } = await api.postData('auth/changepassword', formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if(data.isSuccess === true){
            return dispatch(setToast(data.message, 'info'));
        }
        else{
            dispatch(setToast(data.message, 'danger'));
        }
    } catch ({ response }) {
        response && response.data && dispatch(setToast(response.data.Message && response.data.Message, 'danger'));
    }
}

export const closeAccount = (id) => async (dispatch) => {
    try {
        const { token } = await api.getAuthToken();
        const { data } = await api.getData(`auth/removeuser?id=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if(data.isSuccess === true){
            dispatch(setRedirect('/'));
            dispatch(logout());
            return dispatch(setToast(data.message, 'info'));
        }
        else{
            dispatch(setToast(data.message, 'danger'));
        }
    } catch ({ response }) {
        response && response.data && dispatch(setToast(response.data.Message && response.data.Message, 'danger'));
    }
}

export const getUserByIdWithRoles = (id) => async (dispatch) => {
    try {
        const { token } = await api.getAuthToken();
        const { data } = await api.getData(`auth/getuserbyidwithroles?id=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if(data.isSuccess === true){
            return dispatch({type: accountTypes.GET_USER_WITH_ROLES, payload: data.data});
        }
        throw data;
    } catch ({ response }) {
    }
}

export const logout = () => async (dispatch) => {
    try {
        api.removeAuthToken();
        dispatch(setToast('Goodbye!'));
        return dispatch({type: accountTypes.LOGOUT, payload: false});
    } catch ({ response }) {
    }
}

export const checkIsAuth = () => async (dispatch) => {
    try {
        const { token } = await api.getAuthToken();
        const { data } = await api.getData(`auth/checkisauth`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if(data.isSuccess === true){
            return dispatch({type: accountTypes.CHECKISAUTH, payload: true});
        }
        throw data;
    } catch ({ response }) {
        api.removeAuthToken();
        return dispatch({type: accountTypes.CHECKISAUTH, payload: false});
    }
}

export const checkIsAdmin = () => async (dispatch) => {
    try {
        const { token } = await api.getAuthToken();
        const { data } = await api.getData(`auth/checkisadmin`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if(data.isSuccess === true){
            return dispatch({type: accountTypes.CHECKISADMIN, payload: true});
        }
        throw data;
    } catch ({ response }) {
        return dispatch({type: accountTypes.CHECKISADMIN, payload: false});
    }
}