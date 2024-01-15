import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Provider} from 'react-redux';
import reducers from './reducers';
import {createStore} from 'redux';
import smoothscroll from 'smoothscroll-polyfill';
import './App.scss';
 
smoothscroll.polyfill();

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render( 
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

