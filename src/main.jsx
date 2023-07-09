import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingScreen from "./screens/LandingScreen.jsx";
import FeedbackProvider from "./context/FeedbackContext";
import FeedbackScreen from "./screens/FeedbackScreen";
import { Comments, detailsLoader } from "./screens/Comments";
import { EditScreen, editLoader } from "./screens/EditScreen";
import Roadmap from "./screens/Roadmap";

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
    loader: detailsLoader,
  },
  {
    path: "comments/:id/edit/",
    element: <EditScreen />,
    loader: editLoader
  },
  {
    path: "/roadmap",
    element: <Roadmap />
  },
  {
    path: "*",
    element: <LandingScreen />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <FeedbackProvider>
    <RouterProvider router={router} />
  </FeedbackProvider>
);
