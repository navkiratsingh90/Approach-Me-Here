import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Pages/Home/Home'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import About from './Pages/About/About'
import Buy from './Pages/Buy/Buy'
import Sell from './Pages/Sell/Sell'
import Wishlist from './Pages/Wishlist/Wishlist'
import Contact from './Pages/Contact/Contact'
import { store } from './Store/Store'
import {Provider} from 'react-redux'
import Cars from './Pages/BuyCategories/Cars/Cars'
import CarForm from './Forms/CarForm'
import Login from './Auth/Login/Login'
import Logout from './Auth/Logout/Logout'
import Register from './Auth/Register/Register'
import MobileForm from './Forms/MobileForm'
import ElectronicsForm from './Forms/ElectronicForm'
import Mobiles from './Pages/BuyCategories/Cars/Mobiles'
import FurnitureForm from './Forms/FurnitureForm'
import Electronics from './Pages/BuyCategories/Cars/Electronics'
import Furniture from './Pages/BuyCategories/Cars/Furniture'
import OthersForm from './Forms/OthersForm'
import BikeForm from './Forms/BikeForm'
import Bikes from './Pages/BuyCategories/Cars/Bikes'
import Vehicle from './Pages/Dynamic Pages/Vehicle'
import Bike from './Pages/Dynamic Pages/Bike'
import Mobile from './Pages/Dynamic Pages/Mobile'
import FurnitureDp from './Pages/Dynamic Pages/Furniture'
import Electronic from './Pages/Dynamic Pages/Electronic'
import UserDashboard from './Pages/Dashboard/UserDashboard'
import ForgotPassword from './Auth/ForgorPassword/ForgotPassword'
import ElectronicForm from './Forms/ElectronicForm'
import Ads from './Pages/AdsPosted/Ads'
import AdminDashboard from './Pages/Dashboard/AdminDashboard'
import Others from './Pages/BuyCategories/Cars/Others'
import Other from './Pages/Dynamic Pages/Other'
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OTPVerifyForm from './Auth/VerifyOtp/Otp'
import ResetPasswordForm from './Auth/ResetPassword/ResetPassword'

const router = createBrowserRouter([
  {
    path: '/',
    element : <Layout/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/about',
        element: <About/>
      },
      {
        path : '/contact',
        element: <Contact/>
      },
      {
        path: '/buy',
        element: <Buy/>,
      },
      {
        path: '/sell',
        element: <Sell/>
      },
      {
        path: '/dashboard/wishlist',
        element: <Wishlist/>
      },
        {
          path: '/dashboard',
          element: <UserDashboard/>
        },
      {
        path : '/login',
        element : <Login/>
      },
      {
        path : '/logout',
        element : <Logout/>
      },
      {
        path : '/register',
        element : <Register/>
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword/>
      },
      {
        path: '/otp-verify',
        element: <OTPVerifyForm/>
      },
      {
        path: '/reset-password',
        element: <ResetPasswordForm/>
      },
      
      {
        path: '/sell/CarForm',
        element : <CarForm/>
      },
      {
        path : '/sell/BikeForm',
        element: <BikeForm/>
      },
      {
        path: '/sell/MobileForm',
        element : <MobileForm/>
      },
      {
        path: '/sell/ElectronicForm',
        element : <ElectronicForm/>
      },
      {
        path : '/sell/FurnitureForm',
        element : <FurnitureForm/>
      },
      {
        path : '/sell/OtherForm',
        element:<OthersForm/>
      },
      {
        path : '/buy/cars',
        element: <Cars/>
      },
      {
        path: '/buy/bikes',
        element : <Bikes/>
      },
      {
        path: '/buy/mobiles',
        element: <Mobiles/>
      },
      {
        path: '/buy/electronics',
        element: <Electronics/>
      },{
        path : '/buy/furnitures',
        element: <Furniture/>
      },
      {
        path : '/buy/others',
        element: <Others/>
      },
      {
        path: '/buy/Car/:id',
        element: <Vehicle/>
      },
      {
        path: '/buy/Bike/:id',
        element: <Bike/>
      },
      {
        path: '/buy/Other/:id',
        element: <Other/>
      },
      {
        path:'/buy/Mobile/:id',
        element: <Mobile/>
      },
      {
        path: '/buy/Furniture/:id',
        element: <FurnitureDp/>
      },
      {
        path: '/buy/Electronics/:id',
        element: <Electronic/>
      },
      {
        path: '/dashboard/ads',
        element: <Ads/>
      }
    ]
  },
  {
    path:'/admin',
    element:<AdminDashboard/>
  },
  {
      path: '/userdashboard',
      element: <UserDashboard/>,
      children: [
        {
          path: '/userdashboard/ads',
          element: <Ads/>
        },
        {
          path: '/userdashboard/wishlist',
          element: <Wishlist/>
        }
      ]
  }
])

function App() {
  
  return (
    <>
    <ToastContainer 
      autoClose={2000} // 2 seconds (default is 5000ms)
      position="top-right"
    />
    <Provider store={store}>
      <RouterProvider router={router}/>
      </Provider>
    </>
  )
}

export default App
