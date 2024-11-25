import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createOrder} from "../../actions";
import {useNavigate} from "react-router";
import toast from "react-hot-toast";

export const useCreateOrder = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {mutate, isPending, isError} = useMutation({
        mutationFn: createOrder,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['orders'],

            })
            navigate(`/checkout/${data.id}/thank-you`)
        },
        onError: (error) => {
            toast.error(error.message, {
                position: "top-right",
            })
        }

    })

    return {
        mutate,
        isPending,
        isError
    }


}