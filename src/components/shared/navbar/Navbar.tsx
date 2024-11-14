import React from "react";
import {CiHome} from "react-icons/ci";
import {IoIosPhonePortrait} from "react-icons/io";
import {SiAboutdotme} from "react-icons/si";
import {NavLinks} from "./NavLinks";
import {NavItem} from "../../../utils";
import {Link} from "react-router-dom";
import {FaBarsStaggered} from "react-icons/fa6";
import {HiOutlineSearch, HiOutlineShoppingBag} from "react-icons/hi";
import {Logo} from "../logo/‎Logo";


const navItems: NavItem[] = [
    {
        title: "Inicio",
        icon: <CiHome size={30}/>,
        link: "/"
    },
    {
        title: "Celulares",
        icon: <IoIosPhonePortrait size={30}/>,
        link: "/cel"
    },
    {
        title: "Nosotros",
        icon: <SiAboutdotme size={30}/>,
        link: "/about"
    }
]
export const NavBar = (): React.JSX.Element => {
    return (
        <>
            <header
                className="bg-white text-gray-900 py-4 flex items-center justify-between px-5 border-b border-slate-200 lg:px-12">
                {/* Logo */}
                <Logo />

                {/* Navegación */}
                <nav className="space-x-5 hidden md:flex">
                    {navItems.map((item,i) => (
                        <NavLinks key={i} {...item}/>
                    ))}
                </nav>

                {/* Acciones */}
                <div className="flex items-center gap-5">
                    {/* Botón de búsqueda */}
                    <button>
                        <HiOutlineSearch size={25}/>
                    </button>

                    {/* Perfil de usuario */}
                    <Link
                        to="/account"
                        className="border-2 border-slate-700 w-9 h-9 rounded-full grid place-items-center text-lg font-bold"
                    >
                        R
                    </Link>

                    {/* Carrito con contador */}
                    <button className="relative">
                    <span
                        className="absolute -bottom-2 -right-2 w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center">
                        0
                    </span>
                        <HiOutlineShoppingBag size={25}/>
                    </button>

                    {/* Menú hamburguesa para móviles */}
                    <button className="md:hidden">
                        <FaBarsStaggered size={25}/>
                    </button>

                </div>
            </header>
        </>
    )
}
