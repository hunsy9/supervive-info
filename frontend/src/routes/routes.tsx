import { createBrowserRouter } from "react-router-dom";
import { Home } from "../Home/Home";

export const router = createBrowserRouter([
  {
    index: true,
    path: "/",
    element: <Home />,
  },
]);
