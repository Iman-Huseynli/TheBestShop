import initialState from '../initialState'
import * as actionTypes from '../actions/shop/shopTypes';


export default function shopReducer (state = initialState, { type, payload }) {
    switch (type) {
        case actionTypes.SET_SELECTED_CATEGORY:
            return { 
                ...state,
                selectedCategory: payload 
            }
        case actionTypes.SET_SELECTED_COMPANY:
            return {
                ...state,
                selectedCompanyName: payload
            }
        case actionTypes.SET_SELECTED_PAGINATION:
            return { 
                ...state,
                selectedPagination: payload 
            }
        case actionTypes.SET_SELECTED_REVIEW:
            return {
                ...state,
                reviewFilter: payload
            }
        case actionTypes.SET_PAGINATION_START:
            return { 
                ...state,
                paginationStart: payload 
            }
        case actionTypes.SET_PAGINATION_END:
            return { 
                ...state,
                paginationEnd: payload 
            }
        case actionTypes.SET_PAGINATION_COUNT:
            return { 
                ...state,
                paginationCount: new Array(payload).fill("") 
            }
        case actionTypes.SET_PRODUCTS_COUNT:
            return { 
                ...state,
                productsCount: payload
            }
        case actionTypes.SET_SEARCH_VALUE:
            return { 
                ...state,
                searchValueFilter: payload 
            }
        case actionTypes.SET_PRICE_FILTER:
            return { 
                ...state,
                priceFilter: payload.id,
                minPriceFilter: payload.min,
                maxPriceFilter: payload.max,
            }
    default:
        return state
    }
}
