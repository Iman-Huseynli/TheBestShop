import initialState from '../initialState';
import * as actionTypes from '../actions/admin/adminTypes';

export default function adminReducer (state = initialState, { type, payload }) {
    switch (type) {
        case actionTypes.SET_ADMIN_PAGE_DATA:
            return { ...state,
                mainAdminData: payload.data,
                refleshPage: false,
                mainAdminDataCount: payload.count,
                mainAdminPaginationCount: new Array(payload.paginationCount).fill("")
            }
        case actionTypes.GET_ROLES:
            return { ...state,
                roles: payload
            }
        case actionTypes.GET_ROLE:
            return { ...state,
                role: payload
            }
        case actionTypes.SET_ADMIN_PAGE_SEARCH_VALUE:
            return { ...state,
                adminSearchValue: payload
            }
        case actionTypes.SET_REFLESH:
            return { ...state,
                refleshPage: payload
            }
    default:
        return state
    }
}
