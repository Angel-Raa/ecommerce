import React from "react";
import {HiOutlineShoppingBag} from "react-icons/hi";
import {useGlobalStore} from "../../../store/global.store";
import {IoMdClose} from "react-icons/io";
import {Link} from "react-router-dom";
import {RiSecurePaymentLine} from "react-icons/ri";
import {CartItem} from "./CartItem";
import {useCartStore} from "../../../store/cart.store";

export const Cart = (): React.JSX.Element => {
    const closeSheet = useGlobalStore(state => state.closeSheet);
    const  totalItemsInCart = useCartStore(state => state.totalItemsInCart)
    const items = useCartStore(state => state.items);
    const cleanCart = useCartStore(state => state.clearCart);


    return (
        <>
            <div className='flex flex-col h-full'>
                <div className='px-5 py-7 flex justify-between items-center border-b border-slate-200'>
				<span className='flex gap-3 items-center font-semibold'>
					<HiOutlineShoppingBag size={20}/>
                    {totalItemsInCart} artículos
				</span>
                    <button onClick={closeSheet}>
                        <IoMdClose size={25} className='text-black'/>
                    </button>
                </div>

                {totalItemsInCart > 0 ? (
                    <>
                        {/* LISTA DE PRODUCTOS AÑADIDOS AL CARRITO */}
                        <div className='p-7 overflow-auto flex-1'>
                            <ul className='space-y-9'>
                                {items.map(item => (
                                    <CartItem item={item} key={item.variantId}/>
                                ))}
                            </ul>
                        </div>

                        {/* BOTONES ACCIÓN */}
                        <div className='mt-4 p-7'>
                            <Link
                                to='/checkout'
                                className='w-full bg-black text-white py-3.5 rounded-full flex items-center justify-center gap-3'
                            >
                                <RiSecurePaymentLine size={24}/>
                                Continuar con la compra
                            </Link>

                            <button
                                className='mt-3 w-full text-black border border-black rounded-full py-3'
                                onClick={cleanCart}
                            >
                                Limpiar Carrito
                            </button>
                        </div>
                    </>
                ) : (
                    <div className='flex flex-col items-center justify-center h-full gap-7'>
                        <p className='text-sm font-medium tracking-tight'>
                            Su carro esta vacío
                        </p>
                        <Link
                            to='/celulares'
                            className='py-4 bg-black rounded-full text-white px-7 text-xs uppercase tracking-widest font-semibold'
                            onClick={closeSheet}
                        >
                            Empezar a comprar
                        </Link>
                    </div>
                )}
            </div>
        </>
    )
}