import {useQueries} from "@tanstack/react-query";
import {getRandomProducts, getRecentProducts} from "../../actions";

export const useHomeProducts = () => {
    const results = useQueries({

        queries: [

            {
                queryKey: ['getRecentProducts'],
                queryFn: () => getRecentProducts(),

            },
            {
                queryKey: ['getRandomProducts'],
                queryFn: () => getRandomProducts()
            }
        ]
    })

    const [recentProducts, randomProducts] = results
    const isLoading = recentProducts.isLoading || randomProducts.isLoading;
    const isError = recentProducts.isError || randomProducts.isError;

    return {
        isLoading,
        isError,
        recentProducts: recentProducts.data || [],
        randomProducts: randomProducts.data || [],


    }
}