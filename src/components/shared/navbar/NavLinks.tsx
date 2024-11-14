import React from "react";

import {NavLink} from "react-router-dom";
import {NavItem} from "../../../utils";


export const NavLinks = ({link, icon, title}: NavItem): React.JSX.Element => {
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