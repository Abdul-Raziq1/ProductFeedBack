import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingScreen from './screens/LandingScreen.jsx'
import FeedbackProvider from './context/FeedbackContext'
import FeedbackScreen from './screens/FeedbackScreen'

const router = createBrowserRouter([
  {
    index: true,
    element: <LandingScreen />
  },
  {
    path: '/addFeedback',
    element: <FeedbackScreen />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <FeedbackProvider>
    <RouterProvider router={router}/>
  </FeedbackProvider>
)
