import React from 'react';
import ReactDOM from 'react-dom';
import './services/socketService';
import './index.css';
import './css/App.css';
import App from './App';


// this is the entry point for the application, and all it does is tell react to create the shadow dom of the app component,
// which contains all the contents and logic of the app.

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

