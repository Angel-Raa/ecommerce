import {Link, Navigate} from "react-router-dom";
import {useState} from "react";
import {useLogin, useProfile} from "../../hook";
import {LuLoader2} from "react-icons/lu";
import {Loading} from "../../components";

export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {data: session, isLoading} = useProfile()
    const {mutate, isPending} = useLogin();
    const onLogin = (e: React.FormEvent) => {
        e.preventDefault();
        mutate({email, password})
    }
    if (isLoading) return <Loading/>
    if (session) return <Navigate to={'/'}/>

    return (
        <>
            <div className={"h-full flex flex-col items-center mt-12 gap-5"}>
                <h1 className={"text-4xl font-bold capitalize"}>
                    Iniciar sesión
                </h1>
                <p className={"text-sm font-medium"}>
                    ¡Que bueno tenerte de vuelta!
                </p>
                {/** TODO:  Formularios**/}
                {isPending ?
                    (
                        <div className="w-full h-full flex justify-center mt-20">
                            <LuLoader2 size={70} className={"animate-spin"}/>

                        </div>
                    ) :
                    (
                        <>
                            <form
                                onSubmit={onLogin}
                                className={"flex flex-col items-center gap-4 w-full sm:w-[400px] lg:w-[500px] mt-10 "}>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}

                                    type={"email"} placeholder={"Ingresa tu correo "}
                                    className={"border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full"}/>


                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={"password"} placeholder={"Ingresa tu contraseña "}
                                    className={"border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full"}/>
                                <button
                                    className={"bg-black text-white uppercase font-semibold tracking-wide text-xs py-4 rounded-full mt-5 w-full"}>
                                    Iniciar sesión
                                </button>
                            </form>
                            <p className='text-sm text-stone-800'>
                                ¿No tienes una cuenta?
                                <Link to='/register' className='underline ml-2'>
                                    Regístrate
                                </Link>
                            </p>
                        </>

                    )

                }
            </div>
        </>
    )
}