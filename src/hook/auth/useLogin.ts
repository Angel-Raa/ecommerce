import {useNavigate} from "react-router";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {signIn} from "../../actions";
import toast from "react-hot-toast";

export const useLogin = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: signIn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
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
}