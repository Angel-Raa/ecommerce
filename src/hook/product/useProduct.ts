import {useQuery} from "@tanstack/react-query";
import {getProductBySlug} from "../../actions";

export const useProduct = (slug:string) => {

    const {data, isLoading, isError} = useQuery({
        queryKey:['getProductBySlug', slug],
        queryFn:() => getProductBySlug(slug),
        retry:false,

    })
    return {
        data,
        isLoading,
        isError
    }
}
