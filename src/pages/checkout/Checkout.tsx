import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import {useCartStore} from "../../store/cart.store";
import {FormCheckout, GridCheckout, Loading} from "../../components";
import {useProfile} from "../../hook";
import {useNavigate} from "react-router";
import {supabase} from "../../supabase/client";

export const Checkout = () => {
    const totalItems = useCartStore(state => state.totalItemsInCart)
    const navigate = useNavigate();
    const {isLoading} = useProfile();

    useEffect(() => {
        supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_OUT' || !session) {
                navigate('/login');
            }
        })
    }, [navigate]);

    if (isLoading) return <Loading />;
    return (
        <>

            <div style={{
                minHeight: 'calc(100vh - 100px)'
            }}>
                <header
                    className='h-[100px] bg-white text-black flex items-center justify-center flex-col px-10 border-b border-slate-200'>
                    <Link
                        to='/'
                        className='text-4xl font-bold self-center tracking-tighter transition-all md:text-5xl md:self-start'
                    >
                        <p>
                            Zonal
                            <span className='text-cyan-600'>Móvil</span>
                        </p>
                    </Link>
                </header>
                <main className='w-full h-full flex relative'>
                    {totalItems === 0 ? (
                        <div
                            className='flex flex-col items-center justify-center gap-5 w-full'
                            style={{
                                height: 'calc(100vh - 100px)',
                            }}
                        >
                            <p className='text-sm font-medium tracking-tight'>
                                Su carro esta vacío
                            </p>
                            <Link
                                to='/celulares'
                                className='py-4 bg-black rounded-full text-white px-7 text-xs uppercase tracking-widest font-semibold'
                            >
                                Empezar a comprar
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className='w-full md:w-[50%] p-10'>
                                {/***TODO FURMALARIOS **/}
                                <FormCheckout/>
                            </div>

                            <div
                                className='bg-stone-100 w-[50%] sticky top-0 right-0 p-10 hidden md:block'
                                style={{
                                    minHeight: 'calc(100vh - 100px)',
                                }}
                            >
                                {/*TODO: Elementos del carrito */}
                                <GridCheckout/>

                            </div>
                        </>
                    )}
                </main>
            </div>

        </>
    )
}