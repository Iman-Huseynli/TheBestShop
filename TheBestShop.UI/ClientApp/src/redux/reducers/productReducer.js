import * as actionTypes from '../actions/product/productTypes';
import initialState from '../initialState';


export default function productReducer(state = initialState, action){
    switch (action.type) {
        case actionTypes.GET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        case actionTypes.GET_PRODUCT:
            return {
                ...state,
                product: action.payload
            }
        case actionTypes.GET_BEST_PRICE_PRODUCTS:
            return {
                ...state,
                bestPrice: action.payload
            }
        case actionTypes.GET_FEATURED_PRODUCTS:
            return {
                ...state,
                featuredProducts: action.payload
            }
        case actionTypes.GET_BEST_SELLING_PRODUCTS:
            return {
                ...state,
                bestSelling: action.payload
            }
        case actionTypes.GET_MOST_VIEWED_PRODUCTS:
            return {
                ...state,
                mostViewed: action.payload
            }
        case actionTypes.GET_DETAIL_FEATURED_PRODUCTS:
            return {
                ...state,
                detailFeatured: action.payload
            }
        case actionTypes.GET_COMPANIES:
            return {
                ...state,
                company: action.payload
            }
        default:
            return state;
    }
}