import {Brands, FeatureGrid, ProductGrid} from "../../components";
import {allCelulares} from "../../data/init";
export  const Home = ():React.JSX.Element => {
    return (
        <>
            <section  className="w-full">
                <FeatureGrid />
                <ProductGrid title={"Nuevo Product"} product={allCelulares} />


                <Brands />

            </section>
        </>
    )
}