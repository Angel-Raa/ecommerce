import {prepareProducts} from "../../utils";
import {allCelulares} from "../../data/init";
import {CartProductDetails, FilterBar} from "../../components";
import React from "react";

const preparePhoneProducts = prepareProducts(allCelulares);
export  const Phone = () => {
    return (
        <>

            <h1 className="text-5xl font-semibold text-center mb-8 md:text-4xl md-12">
                 Celulares
            </h1>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {/**TODO: Filtros*/}
                 <FilterBar />
                <div className="col-span-2 lg:col-span-2 xl:col-span-4 flex flex-col gap-2">

                    <div className="grid grid-cols-2 gap-3 gap-y-10 xl:grid-cols-4">

                        {/**Product */}
                        {
                            preparePhoneProducts.map((item) => (
                                <CartProductDetails img={item.images[0]} key={item.id}
                                                    name={item.name}
                                                    price={item.price}
                                                    colors={item.colors}
                                                    slug={item.slug}
                                                    variants={item.variants}


                                />
                            ))
                        }
                    </div>
                    {/** TODO: Paginacion*/}
                </div>
            </div>
        </>
    )
}