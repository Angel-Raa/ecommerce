import {Link, Navigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useProfile, useRegister} from "../../hook";
import {LuLoader2} from "react-icons/lu";
import {Loading} from "../../components";
import {UserRegisterFormValues, userRegisterSchema} from "../../utils";


export const Register = () => {
    const {data:session, isLoading} = useProfile()
    const {mutate, isPending} = useRegister();
    const {register, handleSubmit, formState: {errors}} = useForm<UserRegisterFormValues>({
        defaultValues: {
            email: "",
            password: "",
            fullName: "",
            phone: "",
        },
        resolver: zodResolver(userRegisterSchema),

    });

    const onRegister = handleSubmit(data => {
         const {email, phone, fullName, password} = data;
         mutate({email, password, fullName, phone})


    })


    if(isLoading) return <Loading/>
    if(session) return <Navigate to={'/'}/>

    return (
        <>
            <div className={"h-full flex flex-col items-center mt-12 gap-5"}>
                <h1 className={"text-4xl font-bold capitalize"}>
                    Regístrate
                </h1>
                <p className={"text-sm font-medium"}>
                    Por favor, rellene los siguientes campos:
                </p>

                {
                    isPending ? (
                        <div className="w-full h-full flex justify-center mt-20">
                            <LuLoader2 size={70} className={"animate-spin"}/>

                        </div>
                    ):
                        (
                            <>
                                <form onSubmit={onRegister}
                                      className={"flex flex-col items-center gap-4 w-full sm:w-[400px] lg:w-[500px] mt-10 "}>
                                    <input

                                        {...register('fullName')}
                                        type={"text"} placeholder={"Nombre Completo "}
                                        className={"border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full"}/>

                                    {
                                        errors.fullName && (
                                            <p className={"text-sm font-medium text-red-600"}>{errors.fullName.message}</p>
                                        )
                                    }
                                    <input
                                        {...register('phone')}
                                        type={"tel"} placeholder={"Celular"}
                                        className={"border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full"}/>

                                    <input
                                        {...register('email')}
                                        type={"email"} placeholder={"Ingresa tu correo "}
                                        className={"border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full"}/>

                                    {
                                        errors.email && (
                                            <p className={"text-sm font-medium text-red-600"}>{errors.email.message}</p>
                                        )
                                    }

                                    <input
                                        {...register('password')}
                                        type={"password"} placeholder={"Ingresa tu contraseña "}
                                        className={"border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full"}/>
                                    {
                                        errors.password && (
                                            <p className={"text-sm font-medium text-red-600"}>{errors.password.message}</p>
                                        )
                                    }
                                    <button
                                        className={"bg-black text-white uppercase font-semibold tracking-wide text-xs py-4 rounded-full mt-5 w-full"}>
                                        IRegistrarme
                                    </button>
                                </form>
                                <p className='text-sm text-stone-800'>
                                    ¿Ya tienes una cuenta?
                                    <Link to='/login' className='underline ml-2'>
                                        Inicia sesión
                                    </Link>
                                </p>
                            </>

                        )
                }








            </div>

        </>
    )
}