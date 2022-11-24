import { async } from "@firebase/util";
import { createBrowserRouter } from "react-router-dom";
import AddProduct from "../Components/Dashboard/AddProduct/AddProduct";
import Alluser from "../Components/Dashboard/AllUsers/Alluser";
import DashboardLayout from "../Components/Dashboard/DashboardLayout.js/DashboardLayout";
import MyOrders from "../Components/Dashboard/MyOrders/MyOrders";
import Main from "../Components/Main/Main";
import Blog from "../Components/Pages/Blog/Blog";
import ErrorPage from "../Components/Pages/ErrorPage/ErrorPage";
import Home from "../Components/Pages/Home/Home";
import Login from "../Components/Pages/Login/Login";
import PrivetRoute from "../Components/Pages/PrivetRoute/PrivetRoute";
import Products from "../Components/Pages/Products/Products";
import Register from "../Components/Pages/Register/Register";

export const router = createBrowserRouter([

    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
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
            {
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path: '/category-product/:name',
                element: <PrivetRoute> <Products></Products></PrivetRoute>,
                loader: async ({ params }) => {
                    return fetch(`http://localhost:5000/category-product/${params.name}`)
                }
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivetRoute><DashboardLayout></DashboardLayout></PrivetRoute>,
        children: [
            {
                path: '/dashboard',
                element: <PrivetRoute><MyOrders></MyOrders></PrivetRoute>
            },
            {
                path: '/dashboard/addproduct',
                element: <PrivetRoute><AddProduct></AddProduct></PrivetRoute>
            },
            {
                path: '/dashboard/alluser',
                element:<Alluser></Alluser>
            },
        ]
    }

])