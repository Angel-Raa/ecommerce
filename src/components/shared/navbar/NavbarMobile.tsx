import {useGlobalStore} from "../../../store/global.store";
import {IoMdClose} from "react-icons/io";
import {Link, NavLink} from "react-router-dom";
import {navItems} from "./Navbar";

export const NavbarMobile = () => {
    const setActiveNavMobile = useGlobalStore(state => state.setActiveNavMobile);

    return (
        <>
            <div className={"fixed bg-white text-black h-screen w-full shadow-lg animate-slide-in-left z-50 flex justify-center py-32"}>
                <button
                    className={"absolute top-5 right-5"}
                    onClick={() => setActiveNavMobile(false)}>
                    <IoMdClose size={30} className={"text-black"}/>
                </button>
                <div className={"flex flex-col gap-20"}>
                    <Link to={'/'} onClick={
                        close => setActiveNavMobile(false)}
                     className={"text-4xl font-bold transition-all  tracking-tight"}>
                     <p>
                         Celulares
                         <span className={"text-cyan-600"}>Baratos</span>
                     </p>

                    </Link>
                    <div className={"flex flex-col gap-5 items-center"}>
                        {
                            navItems.map((item) => (
                                <NavLink
                                    onClick={() => setActiveNavMobile(false)}
                                    key={item.title}  to={item.link} className={(isActive) => `${isActive ? 'text-cyan-600 underline'  :''  } transition-all duration-300 font-semibold text-xl hover:text-cyan-600 hover:underline` }>
                                    {item.title}
                                </NavLink>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}