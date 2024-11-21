import {Brands, FeatureGrid, ProductGrid} from "../../components";
import { popularCelulares, recentCelulares} from "../../data/init";
import {prepareProducts} from "../../utils";
import React from "react";
import {useProducts} from "../../hook";

const prepareRecentProduct = prepareProducts(recentCelulares);
const preparePopularProduct = prepareProducts(popularCelulares);
export  const Home = ():React.JSX.Element => {

    //const {products, isLoading} = useProducts()
    return (
        <>
            <section  className="w-full">
                <FeatureGrid />
                <ProductGrid title={"Nuevos Productos"} product={prepareRecentProduct} />
                <ProductGrid title={"Celulares Populares"} product={preparePopularProduct} />

                <Brands />
            </section>
        </>
    )
}