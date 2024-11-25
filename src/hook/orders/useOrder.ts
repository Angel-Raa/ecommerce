import {useQuery} from "@tanstack/react-query";
import {getOrderById} from "../../actions";

export const useOrder = (orderId: string) => {

    const {isError, data, isLoading} = useQuery({
        queryKey: ['orderId', orderId],
        queryFn: () => getOrderById(orderId),
        enabled: !!orderId,
        retry: false

    })

    return {
        data,
        isLoading,
        isError

    }
}