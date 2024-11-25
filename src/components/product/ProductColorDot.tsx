import React, {JSX} from "react";

interface Props {
    name: string;
    color: string;
    setActiveColor: React.Dispatch<React.SetStateAction<{ name: string, color: string }>>,
    activeColor: { name: string, color: string }
}

export const ProductColorDot = ({name, color, setActiveColor, activeColor}: Props): JSX.Element => {
    return (
        <>
            <span
                className={`grid place-items-center w-5 h-5 rounded-full cursor-pointer ${activeColor.color === color ? 'border border-black' : ''} `}>
                <span
                    onClick={() => setActiveColor({name, color})}
                    className="w-[14px] h-[14px] rounded-full" style={{
                    backgroundColor: color
                }}/>
            </span>


        </>
    )
}