import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, createStore, compose, combineReducers} from "redux";
import {Provider} from "react-redux";
import loginReducer from "./login.reducer";
import profileReducer from "./profile.reducer";
import thunk from "redux-thunk";
import preloadedState from './state-mock';
// const preloadedState = {};
import mySaga from './login.saga';
import createSagaMiddleware from 'redux-saga';


const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({login: loginReducer, profile: profileReducer}), preloadedState, composeEnhancers(
    applyMiddleware(thunk, sagaMiddleware)
  ));

sagaMiddleware.run(mySaga);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
