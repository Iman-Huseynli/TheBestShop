import initialState from '../initialState';
import * as actionTypes from '../actions/cart/cartTypes';

export default function cartReducer (state = initialState, { type, payload }) {
    switch (type) {
        case actionTypes.SET_CART_COUNT:
            return { ...state,
                cartCount: payload 
            }
        case actionTypes.SET_CART:
            return { ...state,
                carts: payload 
            }

    default:
        return state
    }
}
