import {createBrowserRouter, Navigate} from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import {Phone, About, Home, PhoneDetail, Login, Register, Order} from "../pages";
import {ClientLayout} from "../layouts/ClientLayout";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children:[
            {
                index:true,
                element:<Home />
            },
            {
                path:"celulares",
                element:<Phone />
            },
            {
              path:"/celulares/:slug",
               element: <PhoneDetail />
            },
            {
                path:"about",
                element:<About />
            },
            {
                path:'login',
                element: <Login/>
            },
            {
                path:'register',
                element:<Register />
            },
            {
                path:"account",
                element:<ClientLayout />,
                children: [
                    {
                        path:'',
                        element:<Navigate to={'/account/pedidos' } />
                    },
                    {
                        path:"pedidos",
                        element:<Order />
                    }
                ]
            }
        ],

    }
])