import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import Login from './dashboard/page/login'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import ErrorPage from "./dashboard/page/error-page";
import Signup from './dashboard/page/signup' 
import VerifySignup from './dashboard/page/verifysignup'
import Home from './dashboard/page/Home'
import Dashboard from './dashboard/page/dashboard'
import Reddux from './dashboard/reduxx/redux'
import Resetpass from './dashboard/page/resetpass';
import ForgetPass from './dashboard/page/forgetPass';
import Profile from './dashboard/page/profile';
import Editprofile from './dashboard/page/editprofile'
import Weather from './dashboard/page/weather'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './reducers/store';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <Signup/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/verifysignup",
    element: <VerifySignup/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/forgetpass",
    element: <ForgetPass/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/resetpass",
    element: <Resetpass/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <Home/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/redux",
    element: <Reddux/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: <Profile/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/editprofile",
    element: <Editprofile/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/weather",
    element: <Weather/>,
    errorElement: <ErrorPage />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
