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
import { ErrorElement } from './components'

// loader
import { loader as landingLoader } from './pages/Landing'
import { loader as profileLoader } from './pages/Profile'
import { loader as historyLoader } from './pages/History'
import { loader as singleSessionLoader } from './pages/SingleSession'

// action
import { action as loginAction } from './pages/Login'
import { action as registerAction } from './pages/Register'
import { action as sessionAction } from './pages/Session'

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
        errorElement: <ErrorElement />,
      },
      {
        path: 'session',
        element: <Session />,
        action: sessionAction,
      },
      {
        path: 'session/:id',
        element: <SingleSession />,
        loader: singleSessionLoader,
        errorElement: <ErrorElement />,
      },
      {
        path: 'history',
        element: <History />,
        loader: historyLoader,
        errorElement: <ErrorElement />,
      },
      {
        path: 'profile',
        element: <Profile />,
        loader: profileLoader,
        errorElement: <ErrorElement />,
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
