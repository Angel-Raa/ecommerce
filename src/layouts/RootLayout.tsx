import React from "react";
import {Outlet} from "react-router";
import {Footer} from "../components/shared/footer";
import {NavBar} from "../components/shared/navbar";

export const RootLayout = (): React.JSX.Element => {

    return (
        <>
            <div className={`h-screen flex flex-col `}>
                <NavBar/>
                <main className={`container my-8 flex-1`}>
                    <Outlet/>
                </main>
                <div>
                    <Footer />
                </div>
            </div>

        </>
    )
}
export default RootLayout;