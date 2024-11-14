import {createBrowserRouter} from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import {Phone, About, Home} from "../pages";


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
                path:"cel",
                element:<Phone />
            },
            {
                path:"about",
                element:<About />
            }
        ],

    }
])