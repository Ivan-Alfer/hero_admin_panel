import { legacy_createStore as createStore } from 'redux';
import {applyMiddleware, combineReducers, compose} from "@reduxjs/toolkit";
import ReduxThunk from 'redux-thunk';
import heroes from "../reducers/heroes";
import filters from "../reducers/filters";

const stringMiddleWear = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action);
};

const enhancer = (createStore) => (...args) => {
    const store = createStore(...args);

    const oldDispatch = store.dispatch;
    store.dispatch = (action) => {
        if (typeof action === 'string') {
            return oldDispatch({
                type: action
            })
        }
        return oldDispatch(action);
    }
    return store;
}

const store = createStore(
    combineReducers({heroes, filters}),
    compose(applyMiddleware(ReduxThunk, stringMiddleWear),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

    // compose(enhancer,
    //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;