import React from "react";
import {Outlet, useLocation} from "react-router";
import {Banner, Footer, NavBar, NavbarMobile, Newsletter, Sheet} from "../components";
import {useGlobalStore} from "../store/global.store";

export const RootLayout = (): React.JSX.Element => {
    const {pathname} = useLocation();
    const isSheetOpen = useGlobalStore(state => state.isSheetOpen);
    const active = useGlobalStore(state => state.activeNavMobile);

    return (
        <>
            <div className={`h-screen flex flex-col `}>
                <NavBar/>
                {
                    pathname === "/" && (
                        <Banner/>
                    )
                }
                <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 my-10">
                    <Outlet/>
                </main>
                {
                    pathname === "/" && (
                        <Newsletter/>
                    )
                }

                {
                    isSheetOpen && (<Sheet/>)
                }
                {
                    active && (<NavbarMobile/>)
                }
                <Footer/>

            </div>

        </>
    )
}
export default RootLayout;