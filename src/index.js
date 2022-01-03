import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Main from './base/main';
import axios from 'axios';

// STYLES
import './index.css';
import 'antd/dist/antd.css';

// REDUX
import thunk from "redux-thunk"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import rootReducer from "./redux/reducers"

// REDUX PERSIST
import { persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"

// SET REDUX STORE
const store = createStore(rootReducer, applyMiddleware(thunk))
const persistor = persistStore(store)

// SET DEFAULT AXIOS
axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <Main />
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
