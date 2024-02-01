import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from './pages/Signup/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
      {
          path: '/login',
          element: <Login />
      },
      {
        path: '/sign-up', 
        element: <Signup />
      }
])

function App() {

  return (
    <div className='App'>
      <ToastContainer/>
        <RouterProvider router={router} />
    </div>
  )
}

export default App
