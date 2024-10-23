import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

// Importing different layouts and pages for routing
import Rootlayout from './layouts/rootlayout/RootLayout'
import HomePage from './routes/homePage/HomePage'
import PrivacyPolicy from './routes/privacyPolicy/PrivacyPolicy'
import LogIn from './routes/logIn/LogIn'
import SignUp from './routes/signUp/SignUp'
import Dashboard from './routes/dashboard/Dashboard'
import TrackWorkout from './routes/trackWorkout/TrackWorkout'
import Progress from './routes/progress/Progress'
import Settings from './routes/settings/Settings'

// Defining the routing structure using React Router
const router = createBrowserRouter([
  {
    // The Rootlayout component will always render, with its child routes below
    element: <Rootlayout/>,
    children: [
      {
        // Home page route (path: '/')
        path:"/",
        element: <HomePage/>
      },
      {
        // Privacy Policy route (path: '/privacypolicy')
        path:"/privacypolicy",
        element: <PrivacyPolicy/>
      },
      {
        // Login page route (path: '/logIn')
        path:"/logIn",
        element: <LogIn/>
      },
      {
        // Signup page route (path: '/signUp')
        path:"/signUp",
        element: <SignUp/>
      },
      {
        // Dashboard page (user specific, path: '/user/dashboard')
        path:"/user/dashboard",
        element: <Dashboard/>
      },
      {
        // Track Workout page (path: '/user/trackWorkout')
        path:"/user/trackWorkout",
        element: <TrackWorkout/>
      },
      {
        // Progress page to track user progress (path: '/user/progress')
        path:"/user/progress",
        element: <Progress/>
      },
      {
        // Settings page for the user (path: '/user/settings')
        path:"/user/settings",
        element: <Settings/>
      },
    ],
  },
]);

// Rendering the entire app into the 'root' div in the HTML
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
