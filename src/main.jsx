import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingScreen from './screens/LandingScreen.jsx'
import FeedbackProvider from './context/FeedbackContext'
import FeedbackScreen from './screens/FeedbackScreen'
import {Comments, detailsLoader} from './screens/Comments'


const router = createBrowserRouter([
  {
    index: true,
    element: <LandingScreen />
  },
  {
    path: '/addFeedback',
    element: <FeedbackScreen />
  },
  {
    path: '/comments/:id',
    element: <Comments />,
    loader: detailsLoader
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <FeedbackProvider>
    <RouterProvider router={router}/>
  </FeedbackProvider>
)
