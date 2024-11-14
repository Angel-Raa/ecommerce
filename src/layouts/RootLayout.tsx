import React from "react";
import {Outlet, useLocation} from "react-router";
import {Banner, NavBar, Footer, Newsletter} from "../components";

export const RootLayout = (): React.JSX.Element => {
const {pathname} = useLocation();
    return (
        <>
            <div className={`h-screen flex flex-col `}>
                <NavBar/>
                {
                    pathname === "/" && (
                        <Banner />
                    )
                }
                <main className={`container my-8 flex-1`}>
                    <Outlet/>
                </main>
                {
                    pathname === "/" && (
                        <Newsletter/>
                    )
                }
                <div>
                    <Footer />
                </div>
            </div>

        </>
    )
}
export default RootLayout;