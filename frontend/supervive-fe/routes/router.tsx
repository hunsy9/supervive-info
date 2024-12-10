import { createBrowserRouter } from 'react-router-dom';
import {PATH} from "./path";
import {Home} from "../pages/Home/Home";

export const router = createBrowserRouter([
    {
        index: true,
        path: PATH.HOME,
        element: <Home />,
    }
])