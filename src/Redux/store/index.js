import {createStore, applyMiddleware, compose} from "redux";
import rootReducer from "../reducer/index";
import thunkMiddleware from "redux-thunk";
import { localStorageCartMiddleware } from "../reducer/utils/localStorageCart";

const composeEnhancer= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store= createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunkMiddleware, localStorageCartMiddleware))
);

export default store;