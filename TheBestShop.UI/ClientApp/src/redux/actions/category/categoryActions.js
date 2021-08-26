import * as categoryTypes from './categoryTypes';
import * as api from '../../../api/api';


export const getCategory = () => async (dispatch) => {
    try {
        const { data } = await api.getData('category/getall');
        if(data.isSuccess === true){
            return dispatch({type: categoryTypes.GET_CATEGORIES, payload: data.data});
        }
        throw data;
    } catch ({ response }) {
    }
}

export const getCategoryById = (id) => async (dispatch) => {
    try {
        const { data } = await api.getData(`category/getbyid?id=${id}`);
        if(data.isSuccess === true){
            return dispatch({type: categoryTypes.GET_CATEGORY, payload: data.data});
        }
        throw data;
    } catch ({ response }) {
    }
}

