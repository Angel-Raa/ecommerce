import {JSX} from "react";

interface Props {
    className?: string | undefined;
}

export const Separator = ({className}: Props): JSX.Element => {
    return (
        <>
            <div className={`bg-slate-200 h-px my-5 ${className}`}>

            </div>
        </>
    )
}