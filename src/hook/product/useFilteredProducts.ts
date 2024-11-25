import {useQuery} from "@tanstack/react-query";
import {getFilteredProducts} from "../../actions";

export const useFilteredProducts = ({page, brands}: {
    page: number;
    brands: string[];
}) => {
    const {data, isLoading} = useQuery({
        queryKey: ['getFilteredProducts', page, brands],
        queryFn: () => getFilteredProducts({page, brands}),
        retry: false
    })

    return {

        products: data?.data,
        isLoading,
        total: data?.count ?? 0
    }

}