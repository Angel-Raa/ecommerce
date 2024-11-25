import React from "react";
import {Link} from "react-router-dom";
import {BiChevronRight} from "react-icons/bi";
import {SocialLinks} from "../../../utils";
import {FaGithub} from "react-icons/fa";
import {FaSquareXTwitter} from "react-icons/fa6";

const socialLinks: SocialLinks[] = [
    {
        link: "https://github.com/Angel-Raa",
        icon: <FaGithub size={20}/>

    },
    {
        link: "https://x.com/_AAguero_",
        icon: <FaSquareXTwitter/>
    }
]

export const Footer = (): React.JSX.Element => {
    return (
        <>
            <footer
                className="py-16 px-12 mt-10 bg-gray-950 text-slate-300 flex flex-wrap gap-10 md:flex-nowrap md:justify-between">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold tracking-tight text-white transition-all flex-1">
                    Zona Móvil
                </Link>

                {/* Sección de Suscripción */}
                <div className="flex flex-col gap-4 flex-1 max-w-xs">
                    <p className="font-semibold uppercase tracking-tight text-white">Compra</p>
                    <p className="text-xs font-medium">Recibe Buena Oferta</p>
                    <div className="flex items-center gap-2 border border-gray-800 rounded-full px-2 py-1">
                        <input
                            type="email"
                            name="email"
                            placeholder="Correo Electrónico"
                            className="bg-gray-900 text-sky-200 w-full focus:outline-none pl-2 py-1 text-sm rounded-full"
                        />
                        <button className="text-slate-400 p-1">
                            <BiChevronRight size={20}/>
                        </button>
                    </div>
                </div>

                {/* Sección de Políticas */}
                <div className="flex flex-col gap-4 flex-1">
                    <p className="font-semibold uppercase tracking-tight text-white">Políticas</p>
                    <nav className="flex flex-col gap-2 text-xs font-medium">
                        <Link to="/cel">Productos</Link>
                        <Link to="#" className="text-slate-400 hover:text-white transition-all">Términos de uso</Link>
                    </nav>
                </div>

                {/* Sección de Redes Sociales */}
                <div className="flex flex-col gap-4 flex-1">
                    <p className="font-semibold uppercase tracking-tight text-white">Síguenos</p>
                    <p className="text-xs leading-6">No te pierdas las novedades que Zona Móvil tiene para ti.</p>
                    <div className="flex space-x-2">
                        {socialLinks.map((link, i) => (
                            <a
                                key={i}
                                href={link.link}
                                target="_blank"
                                rel="noreferrer"
                                className="text-slate-300 border border-gray-800 rounded-full w-10 h-10 flex items-center justify-center transition-all hover:bg-white hover:text-gray-950"
                            >
                                {link.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </footer>
        </>
    )
}