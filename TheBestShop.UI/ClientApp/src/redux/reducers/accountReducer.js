import initialState from '../initialState';
import * as actionTypes from '../actions/account/accountTypes';

export default function accountReducer (state = initialState, { type, payload }){
    switch (type) {
        case actionTypes.REGISTER:
            return { ...state,
                ...payload 
        }
        case actionTypes.LOGIN:
            return { ...state,
                isAuth: true
        }
        case actionTypes.LOGOUT:
            return { ...state,
                isAuth: false
        }
        case actionTypes.CHECKISAUTH:
            return { ...state,
                isAuth: payload
        }
        case actionTypes.CHECKISADMIN:
            return { ...state,
                isAdmin: payload
        }
        case actionTypes.GET_USER:
            return { ...state,
                accountPageUser: payload
        }
        case actionTypes.GET_USER_WITH_ROLES:
            return { ...state,
                user: payload
        }
    default:
        return state
    }
}
