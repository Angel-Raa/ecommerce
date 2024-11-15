import React from "react";
interface Props {
    title: string,
    product: any[]
}

export  const ProductGrid = ({title, product = []} :Props):React.JSX.Element => {
    return (
        <>
            <div className="my-32">
                <h2 className="text-3xl font-semibold text-center md-8 md:text-4xl lg:text-5xl ">
                    {title}
                </h2>
                <div className="grid gap-y-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

                    {
                        product.map((item)=> (
                         <div className="flex flex-col gap-6 relative" key={item.id}>
                             <h3>Products sample</h3>
                         </div>
                        ))
                    }

                </div>
            </div>
        </>
    )
}