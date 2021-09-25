//התקנות ראשוניות
//npm i axios moment react-file-base64 react-redux redux redux-thunk @material-ui/core @material-ui/icons 
//rafce קומפוננטה ריקה
//clg→	console.log(object)
//imr→	import React from 'react'
//התקנות נוספות
//npm i jwt-decode react-google-login react-router-dom
//עוד התקנות
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers'


import App from './App';
import './index.css';
const store = createStore(reducers,compose(applyMiddleware(thunk)));

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>
,document.getElementById('root'));