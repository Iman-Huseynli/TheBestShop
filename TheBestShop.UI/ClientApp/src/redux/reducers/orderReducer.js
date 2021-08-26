import initialState from '../initialState';
import * as actionTypes from '../actions/order/orderTypes';

export default function orderReducer (state = initialState, { type, payload }) {
    switch (type) {
        case actionTypes.SET_ORDER_COUNT:
            return { ...state,
                orderCount: payload 
            }
        case actionTypes.SET_ORDER:
            return { ...state,
                orders: payload 
            }
        case actionTypes.SET_ORDER_SUM:
            return { ...state,
                orderSum: payload +""
            }

    default:
        return state
    }
}
