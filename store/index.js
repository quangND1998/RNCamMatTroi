import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import newsReducer from './reducers/new';
import productServiceReducer from './reducers/productService';
import productRetailReducer from './reducers/productRetail';
import cartReducer from './reducers/cartReducer';
import historyReducer from './reducers/history';
import scheduleReducer from './reducers/schedule';
import addReducer from './reducers/add';
import notificationReducer from './reducers/notification';
const rootReducer = combineReducers({
    auth: authReducer,
    new: newsReducer,
    productService: productServiceReducer,
    productRetails: productRetailReducer,
    cart: cartReducer,
    add: addReducer,
    history: historyReducer,
    schedule: scheduleReducer,
    notification: notificationReducer
});
const middleWares = [thunk]
const store = createStore(rootReducer, applyMiddleware(...middleWares));
export default store;