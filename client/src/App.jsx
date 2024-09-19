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
import { loader as userLoader } from './components/Header'

// action
import { action as loginAction } from './pages/Login'
import { action as registerAction } from './pages/Register'
import { action as sessionAction } from './pages/Session'
import { action as singleSessionAction } from './components/ControlButtons'
import { action as profileAction } from './components/ModalBtn'
import { action as deleteSessionAction } from './components/SessionsList'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    loader: userLoader,
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
        action: singleSessionAction,
        errorElement: <ErrorElement />,
      },
      {
        path: 'history',
        element: <History />,
        loader: historyLoader,
        action: deleteSessionAction,
        errorElement: <ErrorElement />,
      },
      {
        path: 'profile',
        element: <Profile />,
        loader: profileLoader,
        action: profileAction,
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
