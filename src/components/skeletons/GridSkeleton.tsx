import React from "react"
interface Props {
    numberOfItems?: number;
}
export  const GridSkeleton = ({numberOfItems}:Props):React.JSX.Element => {
    return (
        <>
            <div className="my-20 ">
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-8 animate-pulse">
                     {
                         Array.from(Array(numberOfItems).keys()).map((_, i) => (
                             <div key={i} className="bg-gray-200 h-[250px]">

                             </div>
                         ))
                     }
                 </div>
            </div>
        </>
    )
}