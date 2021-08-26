import initialState from '../initialState';
import * as actionTypes from '../actions/general/generalTypes';

export default function generalReducer (state = initialState, { type, payload }) {
    switch (type) {
        case actionTypes.SET_TOAST_MESSAGE:
            return { 
                ...state, 
                toastMessage: payload.toastMessage,
                toastMessageType: payload.toastMessageType
            }
        case actionTypes.SET_REDIRECT:
            return { 
                ...state, 
                redirect: payload
            }
    default:
        return state
    }
}
