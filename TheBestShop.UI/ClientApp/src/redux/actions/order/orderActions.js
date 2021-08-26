import * as orderTypes from './orderTypes';
import * as api from '../../../api/api';
import { setToast } from '../general/generalActions';


const orderNameForLocalStorage = 'thebestshop_order';
const createOrderToLocalStorage = (data) => localStorage.setItem(orderNameForLocalStorage, JSON.stringify(data));
const getOrderFromLocalStorage = () => JSON.parse(localStorage.getItem(orderNameForLocalStorage));
const removeOrderFromLocalStorage = () => localStorage.removeItem(orderNameForLocalStorage);


export const getOrders = () => async (dispatch) => {
    try {
        let data = getOrderFromLocalStorage();
        if (data) {
            dispatch({type: orderTypes.SET_ORDER_COUNT, payload: data.length});
            return dispatch({type: orderTypes.SET_ORDER, payload: data});
        }
    } catch ({ response }) {
        response && response.data && dispatch(setToast(response.data, 'danger'));
    }
}

export const addOrderItem = (product, quantity = 1) => async (dispatch) => {
    try {
        let data = getOrderFromLocalStorage();
        if (data) {
            const index = data.findIndex(c => c.product.id === product.id);
            index === -1 ? data.push({product, quantity}) : data[index].quantity += quantity;
            removeOrderFromLocalStorage();
            createOrderToLocalStorage(data);
        }
        else{
            createOrderToLocalStorage([{product, quantity}]);
        }
        dispatch({ type: orderTypes.SET_ORDER_COUNT, payload: data ? data.length && data.length : 1});
        dispatch(setOrderSum());
        dispatch(setToast('Order added successfully.', 'info'));
        return dispatch({type: orderTypes.SET_ORDER, payload: data});
    } catch ({ response }) {
        dispatch(setToast("There is unknown error. Please try again...", 'danger'));
    }
} 

export const removeFromOrder = ({productId, quantity}) => async (dispatch) => {
    try {
        let data = getOrderFromLocalStorage();
        if (data) {
            const index = data.findIndex(c => c.product.id === productId);
            if(index !== -1){
                data[index].quantity - quantity < 1 ? data.splice(index, 1) : data[index].quantity -= quantity;
                removeOrderFromLocalStorage();
                createOrderToLocalStorage(data);
            }
            dispatch({type: orderTypes.SET_ORDER_COUNT, payload: data.length});
            dispatch(setOrderSum());
            dispatch(setToast('Order deleted successfully.', 'info'));
            return dispatch({type: orderTypes.SET_ORDER, payload: data});
        }
    } catch ({ response }) {
        dispatch(setToast("There is unknown error. Please try again...", 'danger'));
    }
}

export const setOrderSum = () => async (dispatch) => {
    try {
        let data = getOrderFromLocalStorage();
        if (data) {
            let sum = 0;
            data.map(c => sum += c.quantity * c.product.price);
            dispatch({type: orderTypes.SET_ORDER_SUM, payload: sum.toFixed(2)});
        }
    } catch (error) {
        
    }
}

export const addOrder = (formData) => async (dispatch) => {
    try {
        const authToken = api.getAuthToken();
            const { data } = await api.postData('order/addorder', formData, {
                headers: {
                    Authorization: `Bearer ${authToken && authToken.token && authToken.token}`
                }
            });
            if(data.isSuccess === true){
                dispatch(setToast(data.message, 'info'));
                removeOrderFromLocalStorage();
            }
            else{ throw data; }
    } catch ({response}) {
        dispatch(setToast("There is unknown problem...", 'danger'));
    }
}