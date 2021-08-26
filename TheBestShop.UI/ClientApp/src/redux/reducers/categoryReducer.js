import * as categoryTypes from '../actions/category/categoryTypes';
import initialState from '../initialState';


export default function categoryReducer(state = initialState, action){
    switch (action.type) {
        case categoryTypes.GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        case categoryTypes.GET_CATEGORY:
            return {
                ...state,
                category: action.payload
            }
        default:
            return state;
    }
}