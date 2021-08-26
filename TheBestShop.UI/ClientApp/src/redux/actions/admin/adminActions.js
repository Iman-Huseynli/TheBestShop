import * as adminTypes from './adminTypes';
import * as productTypes from '../product/productTypes';
import * as categoryTypes from '../category/categoryTypes';
import * as accountTypes from '../account/accountTypes';
import * as api from '../../../api/api';
import { setToast, setRedirect } from '../general/generalActions';


export const getAllData = ( tableName, pageNumber, pageSize, searchValue = "") => async (dispatch) => {
    try {
        const { token } = await api.getAuthToken();
        const { data } = await api.getData(`admin/getalldata?tableName=${tableName}&searchValue=${searchValue}&pageNumber=${pageNumber}&pageSize=${pageSize}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (data.isSuccess) {
            dispatch({type: productTypes.GET_PRODUCT, payload: null});
            dispatch({type: categoryTypes.GET_CATEGORY, payload: null});
            dispatch({type: accountTypes.GET_USER, payload: null});
            dispatch({type: adminTypes.GET_ROLE, payload: null});
            dispatch(setRedirect(null));
            return dispatch({type: adminTypes.SET_ADMIN_PAGE_DATA, payload: data.data});
        }
        else{
            dispatch(setToast(data.message, 'danger'));
        }
    } catch ({ response }) {
        response && response.data && dispatch(setToast(response.data.Message && response.data.Message, 'danger'));
        return dispatch({type: adminTypes.SET_ADMIN_PAGE_DATA, payload: []});
    }
}

export const addOrUpdateData = (tableName, formData, id = 0) => async (dispatch) => {
    try {
        const { token } = await api.getAuthToken();
        const { data } = await api.postData(`admin/addorupdate${tableName}?id=${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if(data.isSuccess === true){
            dispatch(setToast(data.message, 'info'));
            return dispatch(setRedirect('/admin'));
        }
        else{
            dispatch(setToast(data.message, 'danger'));
        }
    } catch ({ response }) {
        response && response.data && dispatch(setToast(response.data.Message && response.data.Message, 'danger'));
    }
}

export const removeData = (tableName, id) => async (dispatch) => {
    try {
        const { token } = await api.getAuthToken();
        const { data } = await api.getById(`admin/remove${tableName}`, id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if(data.isSuccess === true){
            dispatch(setToast(data.message, 'info'));
            return dispatch({type: adminTypes.SET_REFLESH, payload: true});
        }
        else{
            dispatch(setToast(data.message, 'danger'));
        }
    } catch ({ response }) {
        response && response.data && dispatch(setToast(response.data.Message && response.data.Message, 'danger'));
    }
}

export const getRoles = () => async (dispatch) => {
    try {
        const { token } = await api.getAuthToken();
        const { data } = await api.getData(`admin/getroles`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if(data.isSuccess === true){
            return dispatch({type: adminTypes.GET_ROLES, payload: data.data});
        }
        throw data;
    } catch ({ response }) {
    }
}

export const getRoleById = (id) => async (dispatch) => {
    try {
        const { token } = await api.getAuthToken();
        const { data } = await api.getById(`admin/getrolebyid`, id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if(data.isSuccess === true){
            return dispatch({type: adminTypes.GET_ROLE, payload: data.data});
        }
        else{
            dispatch(setToast(data.message, 'danger'));
        }
    } catch ({ response }) {
        response && response.data && dispatch(setToast(response.data.Message && response.data.Message, 'danger'));
    }
}

export const setAdminSearchValue = (data) => async (dispatch) => {
    dispatch({type: adminTypes.SET_ADMIN_PAGE_SEARCH_VALUE, payload : data});
}
