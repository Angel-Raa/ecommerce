import {Brands, FeatureGrid, ProductGrid} from "../../components";

export  const Home = ():React.JSX.Element => {
    return (
        <>
            <section  className="w-full">
                <FeatureGrid />
                <ProductGrid title={"Nuevo Product"} product={[{id:1, title:"Nuevo Product"}]} />
                <ProductGrid title={"Nuevo Product"} product={[{id:2, title:"Nuevo Product"}]} />

                <Brands />

            </section>
        </>
    )
}