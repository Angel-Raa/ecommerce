import {useMutation, useQueryClient} from "@tanstack/react-query";
import {signUp} from "../../actions";
import {useNavigate} from "react-router";
import toast from "react-hot-toast";

export const useRegister = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {mutate, isPending} = useMutation({
        mutationFn: signUp,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['user']});
            navigate('/');
        },
        onError: err => {
            toast.error(err.message, {
                position: 'bottom-right',
            });
        },
    });

    return {
        mutate,
        isPending,
    };
};