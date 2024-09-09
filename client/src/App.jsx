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
import { ThemeProvider } from './context'
import { ErrorElement } from './components'

// loader
import { loader as landingLoader } from './pages/Landing'

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
        element: <Session />,
      },
      {
        path: 'session/:id',
        element: <SingleSession />,
      },
      {
        path: 'history',
        element: <History />,
      },
      {
        path: 'profile',
        element: <Profile />,
        errorElement: ErrorElement,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
  },
])

const App = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
export default App
