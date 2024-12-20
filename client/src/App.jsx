import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
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
  ChangePassword,
  Alphabets,
  SingleAlphabet,
} from './pages'
import { ThemeProvider } from './utils/ThemeContext'
import { ErrorElement } from './components'
import { getToken } from './utils/auth'
import { toast } from 'react-toastify'

// loader
import { loader as landingLoader } from './pages/Landing'
import { loader as historyLoader } from './pages/History'
import { loader as singleSessionLoader } from './pages/SingleSession'
import { loader as homeLayoutLoader } from './pages/HomeLayout'
import { loader as profileLoader } from './pages/Profile'
import { loader as alphabetsLoader } from './pages/Alphabets'
import { loader as singleAlphabetLoader } from './pages/SingleAlphabet'

// action
import { action as loginAction } from './pages/Login'
import { action as registerAction } from './pages/Register'
import { action as sessionAction } from './pages/Session'
import { action as singleSessionAction } from './components/ControlButtons'
import { action as profileAction } from './components/ModalBtn'
import { action as deleteSessionAction } from './pages/DeleteSession'
import { action as changePasswordAction } from './pages/ChangePassword'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
})

const ProtectedRoute = ({ children }) => {
  const token = getToken()
  if (!token) {
    toast.warning('Please login to access this page')
    return <Navigate to="/login" replace />
  }
  return children
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    loader: homeLayoutLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: landingLoader(queryClient),
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
        path: 'alphabets',
        element: <Alphabets />,
        loader: alphabetsLoader(queryClient),
        errorElement: <ErrorElement />,
      },
      {
        path: 'alphabets/:id',
        element: <SingleAlphabet />,
        loader: singleAlphabetLoader(queryClient),
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
        action: profileAction,
        errorElement: <ErrorElement />,
      },
      {
        path: 'change-password',
        element: (
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        ),
        action: changePasswordAction,
        errorElement: <ErrorElement />,
      },
      {
        path: 'delete-session/:id',
        action: deleteSessionAction,
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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
export default App
