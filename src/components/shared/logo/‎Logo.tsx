import React from "react";
import {Link} from "react-router-dom";

interface Props {
    isDashboard?:boolean
}

export const Logo = ({isDashboard} : Props): React.JSX.Element => {
    return (
        <>
            <Link to={`/`} className={`text-2xl font-bold tracking-tight transition-all ${isDashboard  && 'hover:scale-105'}`}>
                <p className={`hidden lg:block`}>
                    Zona
                    <span className={`text-cyan-600`}>Móvil</span>
                </p>
                <p className={`flex text-4xl lg:hidden`}>
                    <span className={`text-cyan-600 -skew-x-6`}>Z</span>
                    <span className={`text-cyan-600 skew-x-6`}> M</span>
                </p>

            </Link>
        </>
    )
}