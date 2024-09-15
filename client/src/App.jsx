import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {
  Landing,
  Login,
  Register,
  HomeLayout,
  History,
  Error,
  Session,
  Profile,
  SingleSession,
} from './pages'
import { ThemeProvider } from './utils/ThemeContext'
import { AuthProvider } from './utils/AuthContext'
import { ErrorElement, PrivateRoute } from './components'

// loader
import { loader as landingLoader } from './pages/Landing'

// action
import { action as loginAction } from './pages/Login'
import { action as registerAction } from './pages/Register'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: landingLoader,
        errorElement: ErrorElement,
      },
      {
        path: 'session',
        element: (
          <PrivateRoute>
            <Session />
          </PrivateRoute>
        ),
      },
      {
        path: 'session/:id',
        element: (
          <PrivateRoute>
            <SingleSession />
          </PrivateRoute>
        ),
      },
      {
        path: 'history',
        element: (
          <PrivateRoute>
            <History />
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
        errorElement: ErrorElement,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
    action: loginAction,
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
    action: registerAction,
  },
])

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  )
}
export default App
