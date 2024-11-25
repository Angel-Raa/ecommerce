import {useQuery} from "@tanstack/react-query";
import {getSession} from "../../actions";

export const useProfile = () => {
    const {isLoading, data} = useQuery({
        queryKey: ['user'],
        queryFn: getSession,
        retry: false,
        refetchOnWindowFocus: true,
    })


    return {
        data: data?.session, isLoading,

    }
}