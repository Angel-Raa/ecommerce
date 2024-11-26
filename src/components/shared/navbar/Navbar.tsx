import React from "react";
import {CiHome} from "react-icons/ci";
import {IoIosPhonePortrait} from "react-icons/io";
import {SiAboutdotme} from "react-icons/si";
import {NavLinks} from "./NavLinks";
import {NavItem} from "../../../utils";
import {Link} from "react-router-dom";
import {FaBarsStaggered} from "react-icons/fa6";
import {HiOutlineSearch, HiOutlineShoppingBag, HiOutlineUser} from "react-icons/hi";
import {Logo} from "../logo/‎Logo";
import {useGlobalStore} from "../../../store/global.store";
import {useCartStore} from "../../../store/cart.store";
import {useCustomer, useProfile} from "../../../hook";
import {LuLoader2} from "react-icons/lu";


export const navItems: NavItem[] = [
    {
        title: "Inicio",
        icon: <CiHome size={30}/>,
        link: "/"
    },
    {
        title: "Celulares",
        icon: <IoIosPhonePortrait size={30}/>,
        link: "/celulares"
    },
    {
        title: "Nosotros",
        icon: <SiAboutdotme size={30}/>,
        link: "/about"
    }
]
export const NavBar = (): React.JSX.Element => {
    const openSheet = useGlobalStore(state => state.openSheet);
    const setActiveNavMobile = useGlobalStore(state => state.setActiveNavMobile);
    const totalItemsInCart = useCartStore(state => state.totalItemsInCart);
    const {data: session, isLoading} = useProfile()
    const userId = session?.user.id
    const {data:customer, isError, isLoading:isLoadingCustomer} = useCustomer(userId!);


    return (
        <>
            <header
                className="bg-white text-gray-900 py-4 flex items-center justify-between px-5 border-b border-slate-200 lg:px-12">
                {/* Logo */}
                <Logo/>

                {/* Navegación */}
                <nav className="space-x-5 hidden md:flex">
                    {navItems.map((item, i) => (
                        <NavLinks key={i} {...item}/>
                    ))}
                </nav>

                {/* Acciones */}
                <div className="flex items-center gap-5">
                    {/* Botón de búsqueda */}
                    <button onClick={() => openSheet('search')}>
                        <HiOutlineSearch size={25}/>
                    </button>

                    {/* Perfil de usuario */}
                    {isLoading ? (
                        <LuLoader2 className='animate-spin' size={60}/>
                    ) : session ? (
                        <div className='relative'>
                            {/* User Nav */}
                            <Link
                                to='/account'
                                className='border-2 border-slate-700 w-9 h-9 rounded-full grid place-items-center text-lg font-bold'
                            >
                                {
                                    customer && customer.full_name[0]
                                }
                            </Link>
                        </div>
                    ) : (
                        <Link to='/login'>
                            <HiOutlineUser size={25}/>
                        </Link>
                    )}

                    {/* Carrito con contador */}
                    <button className="relative" onClick={() => openSheet('cart')}>
                    <span
                        className="absolute -bottom-2 -right-2 w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center">
                            {totalItemsInCart}
                    </span>
                        <HiOutlineShoppingBag size={25}/>
                    </button>

                    {/* Menú hamburguesa para móviles */}
                    <button className="md:hidden" onClick={() => setActiveNavMobile(true)}>
                        <FaBarsStaggered size={25}/>
                    </button>

                </div>
            </header>
        </>
    )
}
