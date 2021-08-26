import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducers from './index';


const configureStore = () => {
    return createStore(rootReducers, applyMiddleware(thunk));
}

export default configureStore;