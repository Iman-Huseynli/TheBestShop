import * as cartTypes from './cartTypes';
import {setToast} from '../general/generalActions';
import * as api from '../../../api/api';


const cartNameForLocalStorage = 'thebestshop_cart';
const createCartToLocalStorage = (data) => localStorage.setItem(cartNameForLocalStorage, JSON.stringify(data));
const getCartFromLocalStorage = () => JSON.parse(localStorage.getItem(cartNameForLocalStorage));
const removeCartFromLocalStorage = () => localStorage.removeItem(cartNameForLocalStorage);


export const getCartsDetails = () => async (dispatch) => {
    try {
        let cartData = await getCartFromLocalStorage();
        const { data } = await api.postData('cart/getcartsdetails', cartData);
        if(data.isSuccess === true){
            return dispatch({type: cartTypes.SET_CART, payload: data.data});
        }
        throw data;
    } catch ({ response }) {
        
    }
}

export const getCarts = () => async (dispatch) => {
    try {
        const authToken = api.getAuthToken();
        let cartData = await getCartFromLocalStorage();
        if (authToken) {
            if(cartData){
                await api.postData('cart/addtocart', cartData, {
                    headers: {
                        Authorization: `Bearer ${authToken.token}`
                    }
                });
            }
            const { data } = await api.getData('cart/getcarts', {
                headers: {
                    Authorization: `Bearer ${authToken.token}`
                }
            });
            if(data.isSuccess === true){
                removeCartFromLocalStorage();
                let tempArr = data.data.map(c => { return {productId: c.productId}});
                createCartToLocalStorage(tempArr);
                return dispatch({type: cartTypes.SET_CART_COUNT, payload: tempArr.length});
            }
            else{ throw data; }
        }
        else{
            cartData && cartData.length > 0 && dispatch({type: cartTypes.SET_CART_COUNT, payload: cartData.length});
        }
    } catch ({ response }) {
        response && response.data && dispatch(setToast(response.data.Message && response.data.Message, 'danger'));
    }
}

export const addToCart = (productId) => async (dispatch) => {
    try {
        let data = getCartFromLocalStorage();
        if (data) {
            const index = data.findIndex(c => c.productId === productId);
            index === -1 && data.push({productId});
            removeCartFromLocalStorage();
            createCartToLocalStorage(data);
        }
        else{
            createCartToLocalStorage([{productId}]);
        }
        const authToken = api.getAuthToken();
        if (authToken) {
            console.log(authToken)
            const cartData = getCartFromLocalStorage();
            const { data } = await api.postData('cart/addtocart', cartData, {
                headers: {
                    Authorization: `Bearer ${authToken.token}`
                }
            });
            if(data.isSuccess === true){
                removeCartFromLocalStorage();
                let tempArr = data.data.map(c => { return {productId: c.productId}});
                createCartToLocalStorage(tempArr);
            }
            else{ throw data; }
        }
        let result = getCartFromLocalStorage();
        dispatch(setToast('Added to cart successfully', 'success'));
        return dispatch({type: cartTypes.SET_CART_COUNT, payload: result.length});
    } catch ({ response }) {
        response && response.data && dispatch(setToast(response.data.Message && response.data.Message, 'danger'));
    }
}


export const removeFromCart = (productId) => async (dispatch) => {
    try {
        const authToken = api.getAuthToken();
        let cartData = getCartFromLocalStorage();
        if (authToken) {
            const { data } = await api.postData('cart/removefromcart', {productId}, {
                headers: {
                    Authorization: `Bearer ${authToken.token}`
                }
            });
            if(data.isSuccess === true){
                removeCartFromLocalStorage();
                const index = cartData.findIndex(c => c.productId === productId);
                index !== -1 && cartData.splice(index, 1);
                createCartToLocalStorage(cartData);
                dispatch(setToast(data.message, 'success'));
                return dispatch({type: cartTypes.SET_CART_COUNT, payload: cartData.length});
            }
            else{ throw data; }
        }
        else{
            removeCartFromLocalStorage();
            const index = cartData.findIndex(c => c.productId === productId);
            index !== -1 && cartData.splice(index, 1);
            createCartToLocalStorage(cartData);
            dispatch(setToast('Cart deleted successfully.', 'success'));
            return dispatch({type: cartTypes.SET_CART_COUNT, payload: cartData.length});
        }
    } catch ({ response }) {
        response && response.data && dispatch(setToast(response.data.Message && response.data.Message, 'danger'));
    }
}