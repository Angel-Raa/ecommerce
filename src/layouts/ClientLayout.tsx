import {NavLink} from "react-router-dom";
import {signOut} from "../actions";
import {Outlet, useNavigate} from "react-router";
import {useProfile} from "../hook";
import {useEffect} from "react";
import {supabase} from "../supabase/client";
import {Loading} from "../components";

export const ClientLayout = () => {
    const { isLoading: isLoadingSession} = useProfile()
    const navigate = useNavigate();
    useEffect(() => {
        supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_OUT' || !session) {
                navigate('/login', {replace: true});
            }
        })
    }, [navigate]);

    if (isLoadingSession) {
        return <Loading/>
    }
    const handleLogout = async () => {
        localStorage.clear();
        await signOut();

    }
    return (
        <>
            <div className={"flex flex-col gap-5 "}>
                {/** TODO: MENU **/}
                <nav className={"flex justify-center gap-10 text-sm font-medium"}>
                    <NavLink to={'/account/pedidos'}
                             className={(isActive) => `${isActive ? 'underline' : 'hover:underline'}          `}>
                        Pedidos
                    </NavLink>
                    {/** TODO: LINK DASHBOARDD **/}
                    <button className={"hover:underline "} onClick={handleLogout}>
                        Cerrar session
                    </button>
                </nav>

                <main className={"container mt-12 flex-1"}>
                    <Outlet/>
                </main>
            </div>
        </>
    )
}