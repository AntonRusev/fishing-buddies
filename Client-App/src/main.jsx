import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { setupStore } from './app/store.js';
import { RouterProvider } from "react-router-dom";

import { router } from './app/router/routes.jsx';

import './index.css';
import 'react-toastify/dist/ReactToastify.min.css';

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);