import * as shopTypes from './shopTypes';
import * as productTypes from '../product/productTypes';


export const setPriceFilter = (id, min, max) => (dispatch) => {
    dispatch({type: shopTypes.SET_PRICE_FILTER, payload: {id, min, max}});
    dispatch(setSelectedPagination(0));
    dispatch(setPaginationStart(0));
}

export const onHandleSelectedCompany = (data) => dispatch => {
    dispatch(setSelectedPagination(0));
    dispatch(setPaginationStart(0));
    dispatch({ type: productTypes.GET_COMPANIES, payload: data });
}

export const setSelectedCompany = (data) => dispatch => {
    dispatch({ type: shopTypes.SET_SELECTED_COMPANY, payload: data });
}

export const setSelectedCategory = (data) => dispatch => {
    dispatch({type: shopTypes.SET_SELECTED_CATEGORY, payload: data});
    dispatch(setSelectedPagination(0));
    dispatch(setPaginationStart(0));
}

export const setSelectedPagination = (data) => dispatch => {
    dispatch({type: shopTypes.SET_SELECTED_PAGINATION, payload: data});
}

export const setPaginationStart = (data) => dispatch => {
    dispatch({type: shopTypes.SET_PAGINATION_START, payload: data});
}

export const setPaginationEnd = (data) => dispatch => {
    dispatch({type: shopTypes.SET_PAGINATION_END, payload: data});
}

export const setSearchValueFilter = (data) => dispatch => {
    dispatch({type: shopTypes.SET_SEARCH_VALUE, payload: data});
}

export const setReviewFilter = (data) => dispatch => {
    dispatch(setSelectedPagination(0));
    dispatch(setPaginationStart(0));
    dispatch({ type: shopTypes.SET_SELECTED_REVIEW, payload: data });
}