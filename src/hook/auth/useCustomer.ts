import {useQuery} from "@tanstack/react-query";
import {getUser} from "../../actions";

export const useCustomer = (userId:string) => {
    const {data, isLoading, isError} = useQuery({
        queryKey:['customer', userId],
        queryFn:() => getUser(userId),
        retry:false,
        enabled:!!userId,
        refetchOnWindowFocus:true
    })

    return {
        data,
        isLoading,
         isError

    }
}