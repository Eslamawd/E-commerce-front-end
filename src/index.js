import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux"
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import { store } from './app/store';


import LayOut from './LayOut'
import './LayOut.css'


import Home from './routes/pages/home/Home';
import NewProdactForm from './routes/pages/home/NewProdact';
import Auth from './routes/pages/auth/Auth'
import Prefetch from './routes/pages/auth/Prefetch'
import Profile from './routes/pages/profile/Profile';
import PersistLogin from './routes/pages/auth/PersistLogin';
import CartLest from './routes/pages/cart/CartLest';
import EditProdactForm from './routes/pages/home/EditProdact';
import BuyerNew from './routes/pages/home/Buyer';





const router = createBrowserRouter([
  {  path: '/',
  element: <LayOut/>,
  children:[
    {
      path: '/',
      element: <Home />,
    },
    {
      path: 'auth',
      element: <Auth />
    },
    {
      element: <PersistLogin />, 
      children: [ 
        {
          
          element: <Prefetch/>,
          children: [      
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/:id',
          element: <BuyerNew/>,
          },
        
        {
          path: 'cart/:Buyer',
          element: <CartLest />
        },

        
    
        {
          path: 'auth',
          element: <Auth />
        },
    {
      path: 'profile',
      element: <Profile/>,
      children: [
        {
          path: 'edit',
          element: <EditProdactForm/>
      }
      ]
    },
 
    {
      path: 'createpro',
      element: <NewProdactForm/> 
    }
      ]
    },
    ]
  },
    
]

},
])



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

