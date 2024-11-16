import React from "react";
import {CartProductDetails} from "./CartProductDetails";
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
                         <CartProductDetails img={item.img[0]} key={item.id}
                         name={item.name}
                         price={item.price}
                         colors={item.colors}
                         slug={item.slug}
                         variants={item.variants}





                         />
                        ))
                    }

                </div>
            </div>
        </>
    )
}