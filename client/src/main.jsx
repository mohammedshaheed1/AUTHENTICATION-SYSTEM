import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import store from './store/store.js'




// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/login",
//         element: <Protected authentication={false}><Login /></Protected>,
//       },
//       {
//         path: "/signup",
//         element: <Protected authentication={false}><Signup /></Protected>,
//       },
//       {
//         path: "/all-posts",
//         element: <Protected authentication={true}><Allposts /></Protected>,
//       },
//       {
//         path: "/add-post",
//         element: <Protected authentication={true}><AddPost /></Protected>,
//       },
//       {
//         path: "/edit-post/:slug",
//         element: <Protected authentication={true}><EditPost /></Protected>,
//       },
//       {
//         path: "/post/:slug",
//         element: <Protected authentication={true}><Post /></Protected>,
//       },
//     ],
//   },
// ]);







createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
