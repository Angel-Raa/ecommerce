import {useNavigate, useParams} from "react-router";
import {useOrder, useProfile} from "../../hook";
import {Loading} from "../../components";
import {Link} from "react-router-dom";
import {CiCircleCheck} from "react-icons/ci";
import {formatPrice} from "../../utils";
import React, {useEffect} from "react";
import {supabase} from "../../supabase/client";

export const ThankYou = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {data, isLoading, isError} = useOrder(id || "");
    const {isLoading:sessionLoading} = useProfile();
    const fullname = data?.customer.full_name;
    const totalAmount = data?.totalAmount || 0;

    useEffect(() => {
        supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_OUT' || !session) {
                navigate('/login');
            }
        })
    }, [navigate]);


    if (isError) return <div>Error al cargar la orden</div>;
    if (isLoading || !data || sessionLoading) return <Loading/>;
    return (
        <>
            <div className='flex flex-col min-h-screen'>
                <header className='bg-white shadow-sm'>
                    <div className='container mx-auto px-4 py-6'>
                        <Link
                            to='/'
                            className='text-4xl font-bold tracking-tighter transition-all hover:text-cyan-600 md:text-5xl'
                        >
                            Zona<span className='text-cyan-600'>Móvil</span>
                        </Link>
                    </div>
                </header>

                <main className='flex-1 bg-gray-50'>
                    <div className='container mx-auto px-4 py-8'>
                        <div className='max-w-3xl mx-auto space-y-8'>
                            <div className='flex items-center justify-center gap-3 text-4xl font-bold text-gray-800'>
                                <CiCircleCheck className='text-green-500' size={40}/>
                                <h1>¡Gracias, {fullname}!</h1>
                            </div>

                            <div className='bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-4'>
                                <h2 className='text-xl font-semibold'>Tu pedido está confirmado</h2>
                                <p className='text-gray-600'>
                                    Gracias por realizar tu compra en ZonaMóvil. Para realizar la transferencia te
                                    compartimos los siguientes datos:
                                </p>
                                <div className='bg-gray-50 p-4 rounded-md space-y-2 text-sm'>
                                    <p><strong>Banco:</strong> Banco</p>
                                    <p><strong>Tipo de cuenta:</strong> Corriente</p>
                                    <p><strong>Número de cuenta:</strong> 123-456789-0</p>
                                </div>
                                <p className='text-gray-600 text-sm'>
                                    Una vez realizada la transferencia, comparte tu comprobante a zona@movil.com para
                                    procesarla
                                    y hacerte la entrega de tu dispositivo a domicilio.
                                </p>
                            </div>

                            <div className='bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-6'>
                                <h2 className='text-xl font-semibold'>Detalles del pedido</h2>
                                <ul className='divide-y divide-gray-200'>
                                    {data?.orderItems.map((item, index) => (
                                        <li key={index} className='py-4 flex items-center gap-4'>
                                            <img
                                                src={item.productImage}
                                                alt={item.productName}
                                                className='w-16 h-16 object-contain bg-gray-100 rounded'
                                            />
                                            <div className='flex-1 min-w-0'>
                                                <p className='text-sm font-medium text-gray-900 truncate'>{item.productName}</p>
                                                <p className='text-sm text-gray-500'>{item.storage} / {item.color_name}</p>
                                            </div>
                                            <p className='text-sm font-medium text-gray-900'>{formatPrice(item.price)}</p>
                                        </li>
                                    ))}
                                </ul>
                                <div className='flex justify-between items-center pt-4 border-t border-gray-200'>
                                    <span className='text-lg font-semibold'>Total:</span>
                                    <span className='text-lg font-semibold'>{formatPrice(totalAmount)}</span>
                                </div>
                            </div>

                            <div
                                className='bg-white border border-gray-200 rounded-lg shadow-sm p-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div>
                                    <h3 className='text-sm font-semibold mb-2'>Información de contacto:</h3>
                                    <p className='text-sm text-gray-600'>{data?.customer.email}</p>
                                </div>
                                <div>
                                    <h3 className='text-sm font-semibold mb-2'>Métodos de pago:</h3>
                                    <p className='text-sm text-gray-600'>Deposito bancario
                                        - {formatPrice(totalAmount)}</p>
                                </div>
                                <div>
                                    <h3 className='text-sm font-semibold mb-2'>Dirección de envío:</h3>
                                    <address className='text-sm text-gray-600 not-italic'>
                                        <p>{data?.address.addressLine1}</p>
                                        {data?.address.addressLine2 && <p>{data.address.addressLine2}</p>}
                                        <p>{data?.address.city}, {data?.address.state} {data?.address.postalCode}</p>
                                        <p>{data?.address.country}</p>
                                    </address>
                                </div>
                                <div>
                                    <h3 className='text-sm font-semibold mb-2'>Método de envío:</h3>
                                    <p className='text-sm text-gray-600'>Standard</p>
                                </div>
                            </div>

                            <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
                                <p className='text-sm text-gray-600'>
                                    ¿Necesitas ayuda? Ponte en contacto con nosotros
                                </p>
                                <Link
                                    to='/celulares'
                                    className='w-full sm:w-auto text-center bg-black text-white py-3 px-6 rounded-md text-sm font-semibold hover:bg-gray-800 transition-colors duration-200'
                                >
                                    Seguir comprando
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}