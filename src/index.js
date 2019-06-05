import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import * as serviceWorker from './serviceWorker';

import { applyMiddleware, combineReducers, compose, createStore } from 'redux';

import App from './App';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import appValueReducer from './store/reducers/appValueReducers';
import authReducer from './store/reducers/authReducers';
import axios from 'axios';
import fbAuthReducer from './store/reducers/fbAuthReducer';
import notificationReducer from './store/reducers/notificationReducers';
import projectReducer from './store/reducers/projectReducer';
import spinnerReducer from './store/reducers/spinnerReducers';
import thunk from 'redux-thunk';

// require('dotenv').config();
console.log("[~~~ENV VARS~~~]", process.env);

const rootReducer = combineReducers({
    auth: authReducer,
    notify: notificationReducer,
    spinner: spinnerReducer,
    appValues: appValueReducer,
    project: projectReducer,
    fbAuth: fbAuthReducer
});

const logger = store => {
    return next => {
        return action => {
            // console.log("[Middleware] Dispatching", action);
            const result = next(action);
            // console.log('[Middleware] next state', store.getState());
            return result;
        }
    }
}

axios.defaults.baseURL = process.env.API_ROOT;
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(config => {

    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = 'Bearer ' + token;
    }

    // console.log("[axios-request-config]", config);
    return config;

}, error => {
    // console.log("[axios-request-error]", error);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    // console.log("[axios-response]",response);

    return response;
}, error => {
    // console.log("[axios-response-error]", error);
    return Promise.reject(error);
});


const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
