import {Brands, FeatureGrid, ProductGrid} from "../../components";
import { popularCelulares, recentCelulares} from "../../data/init";
import {prepareProducts} from "../../utils";

const prepareRecentProduct = prepareProducts(recentCelulares);
const preparePopularProduct = prepareProducts(popularCelulares);

console.log(prepareRecentProduct);
export  const Home = ():React.JSX.Element => {

    return (
        <>
            <section  className="w-full">
                <FeatureGrid />
                <ProductGrid title={"Nuevos Productos"} product={prepareRecentProduct} />
                <Brands />
            </section>
        </>
    )
}