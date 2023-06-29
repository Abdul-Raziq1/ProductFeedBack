import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingScreen from './screens/LandingScreen.jsx'

const router = createBrowserRouter([
  {
    index: true,
    element: <LandingScreen />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
