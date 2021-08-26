import * as api from '../../../api/api';
import * as productTypes from './productTypes'
import * as shopTypes from '../shop/shopTypes'
import * as adminTypes from '../admin/adminTypes'
import { setToast } from '../general/generalActions';


export const getProducts = () => async (dispatch) => {
    try {
        const { data } = await api.getData('product/getall');
        if(data.isSuccess === true){
            dispatch({type: productTypes.GET_FEATURED_PRODUCTS, payload: data.featuredProducts});
            dispatch({type: productTypes.GET_BEST_PRICE_PRODUCTS, payload: data.bestPrice});
            dispatch({type: productTypes.GET_BEST_SELLING_PRODUCTS, payload: data.bestSelling});
            return dispatch({type: productTypes.GET_MOST_VIEWED_PRODUCTS, payload: data.mostViewed});
        }
        throw data;
    } catch ({ response }) {
        response && response.data && dispatch(setToast(response.data.Message && response.data.Message, 'danger'));
    }
}

export const getProductById = (id) => async (dispatch) => {
    try {
        const { data } = await api.getData(`product/getproduct?id=${id}`);
        if(data.isSuccess === true){
            dispatch({type: productTypes.GET_DETAIL_FEATURED_PRODUCTS, payload: data.detailFeatured});
            return dispatch({type: productTypes.GET_PRODUCT, payload: data.data});
        }
        throw data;
    } catch ({ response }) {
        response && response.data && dispatch(setToast(response.data.Message && response.data.Message, 'danger'));
    }
}

export const getProductByIdWithCategories = (id) => async (dispatch) => {
    try {
        const { data } = await api.getData(`product/getproductwithcategories?id=${id}`);
        if(data.isSuccess === true){
            return dispatch({type: productTypes.GET_PRODUCT, payload: data.data});
        }
        throw data;
    } catch ({ response }) {
        response && response.data && dispatch(setToast(response.data.Message && response.data.Message, 'danger'));
    }
}

export const getCompanies = () => async (dispatch) => {
    try {
        const { data } = await api.getData('product/getallcompany');
        if(data.isSuccess === true){
            return dispatch({type: productTypes.GET_COMPANIES, payload: data.data});
        }
        throw data;
    } catch ({ response }) {
    }
}

export const getProductsWithPagination = (pageNumber, pageSize, minPriceFilter, maxPriceFilter, selectedCategory, selectedCompanyName, reviewFilter, searchValue, sortData) => async (dispatch) => {
    try {
        const { data } = await api.getData(`product/getallwithpagination?pageNumber=${pageNumber}&pageSize=${pageSize}&minPrice=${minPriceFilter}&maxPrice=${maxPriceFilter}&selectedCategory=${selectedCategory}&selectedCompany=${selectedCompanyName}&reviewFilter=${reviewFilter}&searchValue=${searchValue}&sortData=${sortData}`);
        if(data.isSuccess === true){
            dispatch({type: shopTypes.SET_PAGINATION_COUNT, payload: data.data.paginationCount});
            dispatch({type: shopTypes.SET_PRODUCTS_COUNT, payload: data.data.productsCount});
            return dispatch({type: productTypes.GET_PRODUCTS, payload: data.data.products});
        }
        throw data;
    } catch ({ response }) {
        response && response.data && dispatch(setToast(response.data.Message && response.data.Message, 'danger'));
    }
}

