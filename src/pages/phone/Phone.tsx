import {prepareProducts,} from "../../utils";
import {CartProductDetails, FilterBar, Loading} from "../../components";
import React, {useState} from "react";
import {useFilteredProducts} from "../../hook";
import {Pagination} from "../../components/shared/pagination/Pagination";

export  const Phone = () => {
    const [page, setPage] = useState<number>(1);
    const [selectBrands, setSelectBrands] = useState<string[]>([])
    const {products = [], isLoading, total} = useFilteredProducts({
        page, brands: selectBrands,
    });

    const preparePhoneProducts =   prepareProducts(products);

    console.log(preparePhoneProducts);

    return (
        <>

            <h1 className="text-5xl font-semibold text-center mb-8 md:text-4xl md-12">
                 Celulares
            </h1>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {/**TODO: Filtros*/}
                 <FilterBar setSelectBrands={setSelectBrands} selectedBrands={selectBrands}/>
                {
                    isLoading ? (
                        (<Loading />)
                    ) : (
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
                            <Pagination totalItems={total} page={page} setPage={setPage} />
                        </div>


                    )
                }

            </div>
        </>
    )
}