import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import store from './store/store.js'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Protected from './components/AuthLayout.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import EmailVerify from './pages/EmailVerify.jsx'




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Protected authentication={true}> <Home/></Protected>,
      },
      {
        path: "/sign",
        element: <Protected authentication={false}><SignUp /></Protected>,
      },
      {
        path: "/login",
        element: <Protected authentication={false}><Login /></Protected>,
      },
      {
        path: "/VerifyEmail",
        element: <Protected authentication={true}><EmailVerify /></Protected>,
      }
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
       <RouterProvider router={router}/> 
    </Provider>
  </StrictMode>,
)
