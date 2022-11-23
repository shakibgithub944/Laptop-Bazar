import { createBrowserRouter } from "react-router-dom";
import Main from "../Components/Main/Main";
import Home from "../Components/Pages/Home/Home";
import Login from "../Components/Pages/Login/Login";
import Register from "../Components/Pages/Register/Register";

export const router = createBrowserRouter([

    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
        ]
    }

])