import React from 'react';
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import App from './App';
import store from './store/configureStore';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// Use ReactDOM.render to render your app
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
