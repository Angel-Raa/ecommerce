import {JSX} from "react";
interface Props {
    name: string;
    color:string;
}
export const ProductColorDot= ({name, color}:Props):JSX.Element => {
    return (
        <>
            <span className={`grid place-items-center w-5 h-5 rounded-full cursor-pointer`}>
                <span  className="w-[14px] h-[14px] rounded-full" style={{
                    backgroundColor: color
                }}/>
            </span>


        </>
    )
}