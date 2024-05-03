import { combineReducers } from 'redux';
import productReducer from './productReducer'; // Add more reducers as needed
import userReducer from './userReducer';

const rootReducer = combineReducers({
    user: userReducer,
    products: productReducer,
});

export default rootReducer;
