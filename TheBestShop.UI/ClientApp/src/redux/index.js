import { combineReducers } from 'redux';
import categoryReducer from './reducers/categoryReducer';
import productReducer from './reducers/productReducer';
import shopReducer from './reducers/shopReducer';
import cartReducer from './reducers/cartReducer';
import accountReducer from './reducers/accountReducer';
import orderReducer from './reducers/orderReducer';
import adminReducer from './reducers/adminReducer';
import generalReducer from './reducers/generalReducer';


const rootReducers = combineReducers({
    categoryReducer,
    productReducer,
    shopReducer,
    accountReducer,
    cartReducer,
    orderReducer,
    adminReducer,
    generalReducer,
})

export default rootReducers;