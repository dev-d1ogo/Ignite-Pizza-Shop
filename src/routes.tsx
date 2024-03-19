import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "./pages/app/dashboard/dashboard";
import { SignIn } from "./pages/auth/SignIn";
import { AppLayout } from "./pages/_layouts/app";
import { AuthLayout } from "./pages/_layouts/authLayout";
import { SignUp } from "./pages/auth/SignUp";
import { Orders } from "./pages/app/orders/orders";
import { PageNotFound } from "./pages/404/404page";

export const router = createBrowserRouter([
    {
        path: '/signIn',
        element: <AuthLayout/>,
        children: [
            {
                path: '/signIn',
                element: <SignIn/>,
            }
        ]
    },
    {
        path: '/',
        element: <AppLayout/>,
        errorElement: <PageNotFound/>,
        children: [
            { path: '/', element: <Dashboard/> }, { path: '/orders', element: <Orders/> },
        ]
    },
    {
        path: '/signUp',
        element: <AuthLayout/>,
        
        children: [
            {
                path: '/signUp',
                element: <SignUp/>
            }
        ]
    },
    
])