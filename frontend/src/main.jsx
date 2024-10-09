import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Rootlayout from './layouts/rootlayout/RootLayout'
import HomePage from './routes/homePage/HomePage'
import PrivacyPolicy from './routes/privacyPolicy/PrivacyPolicy'
import LogIn from './routes/logIn/LogIn'
import SignUp from './routes/signUp/SignUp'
import Dashboard from './routes/dashboard/Dashboard'
import TrackWorkout from './routes/trackWorkout/TrackWorkout'
import Progress from './routes/progress/Progress'
import Settings from './routes/settings/Settings'

const router = createBrowserRouter([
  {
    element: <Rootlayout/>,
    children: [
      {
        path:"/",
        element: <HomePage/>
      },
      {
        path:"/privacypolicy",
        element: <PrivacyPolicy/>
      },
      {
        path:"/logIn",
        element: <LogIn/>
      },
      {
        path:"/signUp",
        element: <SignUp/>
      },
      {
        path:"/signUp",
        element: <SignUp/>
      },
      {
        path:"/user/dashboard",
        element: <Dashboard/>
      },
      {
        path:"/user/trackWorkout",
        element: <TrackWorkout/>
      },
      {
        path:"/user/progress",
        element: <Progress/>
      },
      {
        path:"/user/settings",
        element: <Settings/>
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
