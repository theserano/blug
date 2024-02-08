import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { lazy, Suspense, useEffect, useState } from 'react';
import Loader from './components/Utility/loader/Loader';

const Login = lazy(() => import('./pages/Login/Login'));
const Signup = lazy(() => import('./pages/Signup/Signup'));

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/sign-up',
    element: <Signup />,
  },
]);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='App'>
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : (
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
        </Suspense>
      )}
    </div>
  );
}

export default App;
