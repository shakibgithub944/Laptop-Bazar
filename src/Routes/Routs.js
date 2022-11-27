import { async } from "@firebase/util";
import { createBrowserRouter } from "react-router-dom";
import AddProduct from "../Components/Dashboard/AddProduct/AddProduct";
import AdminRoute from "../Components/Dashboard/AdminRoute/AdminRoute";
import AllBuyers from "../Components/Dashboard/AllBuyers/AllBuyers";
import AllSeller from "../Components/Dashboard/AllSeller/AllSeller";
import Alluser from "../Components/Dashboard/AllUsers/Alluser";
import DashboardLayout from "../Components/Dashboard/DashboardLayout.js/DashboardLayout";
import MyOrders from "../Components/Dashboard/MyOrders/MyOrders";
import MyProducts from "../Components/Dashboard/MyProducts/MyProducts";
import ReportedItem from "../Components/Dashboard/ReportedItem/ReportedItem";
import SellerRoute from "../Components/Dashboard/SellerRoute/SellerRoute";
import Main from "../Components/Main/Main";
import AllProducts from "../Components/Pages/AllProducts/AllProducts";
import Blog from "../Components/Pages/Blog/Blog";
import ErrorPage from "../Components/Pages/ErrorPage/ErrorPage";
import Home from "../Components/Pages/Home/Home";
import Login from "../Components/Pages/Login/Login";
import Payment from "../Components/Pages/Payment/Payment";
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
                path: '/allProducts',
                element: <AllProducts></AllProducts>,
                loader: async () => {
                    return fetch('https://laptop-bazar-server-psi.vercel.app/toshoping')
                }
            },
            {
                path: '/category-product/:name',
                element: <PrivetRoute> <Products></Products></PrivetRoute>,
                loader: async ({ params }) => {
                    return fetch(`https://laptop-bazar-server-psi.vercel.app/category-product/${params.name}`)
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
                element: <MyOrders></MyOrders>
            },
            {
                path: '/dashboard/addproduct',
                element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
            },
            {
                path: '/dashboard/myproducts',
                element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
            },
            {
                path: '/dashboard/allseller',
                element: <AdminRoute><AllSeller></AllSeller></AdminRoute>
            },
            {
                path: '/dashboard/allbuyers',
                element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>
            },
            {
                path: '/dashboard/reported',
                element: <AdminRoute><ReportedItem></ReportedItem></AdminRoute>
            },
            {
                path: '/dashboard/payment/:id',
                element: <Payment></Payment>,
                loader: ({ params }) => fetch(`https://laptop-bazar-server-psi.vercel.app/booked/${params.id}`)
            },
        ]
    }

])