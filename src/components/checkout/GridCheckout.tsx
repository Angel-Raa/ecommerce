import {useCartStore} from "../../store/cart.store";
import {ItemsCheckout} from "./ItemsCheckout";
import {formatPrice} from "../../utils";


export const GridCheckout = () => {
    const cartItems = useCartStore(state => state.items);
    const totalAmount = useCartStore(state => state.totalAmount);


    return (
        <>
            <div className={"space-y-5"}>
                <ul>
                    {
                        cartItems.map((item) => (
                            <ItemsCheckout item={item} key={item.variantId}/>
                        ))
                    }
                </ul>

            </div>

            <div className='mt-4 p-7 space-y-5'>
                <div className='flex justify-between'>
                    <p className='text-sm font-medium'>Envío</p>
                    <p className='text-sm font-medium uppercase'>Gratis</p>
                </div>
                <div className='flex justify-between font-semibold text-lg'>
                    <p>Total:</p>
                    <p>{formatPrice(totalAmount)}</p>
                </div>
            </div>
        </>

    )
}