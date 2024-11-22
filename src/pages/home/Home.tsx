import {Brands, FeatureGrid, GridSkeleton, ProductGrid} from "../../components";
import {prepareProducts} from "../../utils";
import React from "react";
import {useHomeProducts} from "../../hook";


export const Home = (): React.JSX.Element => {

    const {isLoading, recentProducts, randomProducts} = useHomeProducts();
    const prepareRecentProduct = prepareProducts(recentProducts);
    const preparePopularProduct = prepareProducts(randomProducts);

    return (
        <>
            <section className="w-full">
                <FeatureGrid/>
                {
                    isLoading ? (<GridSkeleton numberOfItems={4}/>) : (
                        <ProductGrid title={"Nuevos Productos"} product={prepareRecentProduct}/>)
                }
                {
                    isLoading ? (<GridSkeleton numberOfItems={4}/>) : (
                        <ProductGrid title={"Celulares Populares"} product={preparePopularProduct}/>)
                }

                <Brands/>
            </section>
        </>
    )
}