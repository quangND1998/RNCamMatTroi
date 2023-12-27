import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import newsReducer from './reducers/new';
const rootReducer = combineReducers({
    auth: authReducer,
    new: newsReducer
});
const middleWares = [thunk]
const store = createStore(rootReducer, applyMiddleware(...middleWares));
export default store;