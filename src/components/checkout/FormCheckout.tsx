import {FormInput} from "./FormInput";
import {GridCheckout} from "./GridCheckout";
import {useForm} from "react-hook-form";
import {AddressFormValues, addressSchema, Order} from "../../utils";
import {zodResolver} from "@hookform/resolvers/zod";
import {useCreateOrder} from "../../hook";
import {useCartStore} from "../../store/cart.store";
import {ImSpinner2} from "react-icons/im";

export const FormCheckout = () => {
    const {register, formState: {errors}, handleSubmit} = useForm<AddressFormValues>({
        resolver: zodResolver(addressSchema),
    })
    const {mutate, isPending} = useCreateOrder()
    const cleanCart = useCartStore(state => state.cleanCart);
    const cartItems = useCartStore(state => state.items);
    const totalAmount = useCartStore(state => state.totalAmount);
    const onSubmit = handleSubmit((data, event) => {

        const orderInput: Order = {
            address: data,
            cartItems: cartItems.map(item => ({
                variantId: item.variantId,
                quantity: item.quantity,
                price: item.price
            })),
            totalAmount

        }
        mutate(orderInput, {
            onSuccess: () => {
                cleanCart();
            }
        })
    })

    if (isPending) {
        return <div className={"flex flex-col gap-3 items-center justify-center h-screen"}>
            <ImSpinner2 className={'animate-spin h-10 w-10'}/>
            <p className='text-sm font-medium'>
                Estamos procesando tu pedido
            </p>
        </div>
    }
    return (
        <>
            <form className={"flex flex-col gap-6"} onSubmit={onSubmit}>
                <div className={"flex flex-col gap-3"}>
                    <h3 className={"text-lg font-semibold tracking-normal"}>Entrega</h3>

                    <FormInput register={register} errors={errors} name={"addressLine1"}
                               placeholder={"Dirección principal"}/>
                    <FormInput register={register} errors={errors} name={"addressLine2"}
                               placeholder={"Dirección adicional (Opcional)"}/>
                    <FormInput register={register} errors={errors} name={"city"} placeholder={"Ciudad"}/>
                    <FormInput register={register} errors={errors} name={"state"} placeholder={"Provincia"}/>
                    <FormInput register={register} errors={errors} name={"postalCode"}
                               placeholder={"Código Postal (Opcional)"}/>

                    <select
                        {...register('country')}
                        className={"border border-slate-200 rounded-md p-3"}>
                        <option value="RD">República Dominicana</option>
                    </select>
                </div>

                {/** Métodos de envío **/}

                <div className={"flex flex-col gap-3"}>
                    <p className={"text-sm font-medium"}> Métodos de envío</p>
                    <div
                        className='flex justify-between items-center text-sm border border-slate-600 bg-stone-100 py-4 rounded-md px-6'>
                        <span className='font-normal'>Standard</span>
                        <span className='font-semibold'>Gratis</span>
                    </div>
                </div>
                {/*** Depósito Bancario **/}
                <div className={"flex flex-col "}>
                    <div
                        className={"flex justify-between items-center text-sm border border-slate-600 bg-stone-100 py-4 rounded-ss-md rounded-se-md px-6 "}>

                        <span>Depósito Bancario</span>
                    </div>
                    <div
                        className='bg-stone-100 text-[13px] p-5 space-y-0.5 border border-gray-200 rounded-es-md rounded-ee-md'>
                        <p>Realiza tu compra mediante transferencia bancaria de forma segura y confiable.</p>
                        <p><strong>Banco:</strong> Banco </p>
                        <p><strong>Tipo de cuenta:</strong> Corriente</p>
                        <p><strong>Número de cuenta:</strong> 123-456789-0</p>
                        <p>Los detalles de la cuenta serán confirmados al completar el proceso de compra.</p>


                    </div>
                </div>

                {/** Resumen del pedido **/}
                <div>

                    <div className='flex flex-col gap-6'>
                        <h3 className='font-semibold text-3xl'>
                            Resumen del pedido
                        </h3>

                        <GridCheckout/>
                    </div>
                </div>
                <button
                    type='submit'
                    className='bg-black text-white py-3.5 font-bold tracking-wide rounded-md mt-2'
                >
                    Finalizar Pedido
                </button>
            </form>

        </>
    )
}