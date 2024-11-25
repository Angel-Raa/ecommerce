import React from "react";

import {NavLink} from "react-router-dom";

interface Props {
    link: string,
    title: string,
}

export const NavLinks = ({link, title}: Props): React.JSX.Element => {
    return (
        <>

            <div>
                <NavLink to={link}
                         className={({isActive}) => `${isActive ? " text-cyan-700 underline" : " "} transition-all duration-300 font-medium hover:text-cyan-600 hover:underline `}>
                    {title}
                </NavLink>
            </div>


        </>
    )
}