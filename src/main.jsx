import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingScreen from "./screens/LandingScreen.jsx";
import FeedbackProvider from "./context/FeedbackContext";
import FeedbackScreen from "./screens/FeedbackScreen";
import Comments from "./screens/Comments";
import EditScreen from "./screens/EditScreen";
import { loaders } from "./data/loaders";
import RoadmapScreen from "./screens/RoadmapScreen";
import NotFound from "./screens/NotFound";
const router = createBrowserRouter([
  {
    index: true,
    element: <LandingScreen />,
  },
  {
    path: "/addFeedback",
    element: <FeedbackScreen />,
  },
  {
    path: "/comments/:id",
    element: <Comments />,
    loader: loaders.detailsLoader,
  },
  {
    path: "comments/:id/edit/",
    element: <EditScreen />,
    loader: loaders.editLoader
  },
  {
    path: "/roadmap",
    element: <RoadmapScreen />
  },
  {
    path: "/error/:id",
    element: <NotFound />,
    loader: loaders.urlLoader
  },
  {
    path: "*",
    element: <LandingScreen />
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <FeedbackProvider>
    <RouterProvider router={router} />
  </FeedbackProvider>
);
