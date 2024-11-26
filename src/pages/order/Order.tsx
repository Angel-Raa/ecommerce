import {useNavigate, useParams} from "react-router";
import {useOrder} from "../../hook";
import {Loading} from "../../components";
import {IoChevronBack} from "react-icons/io5";
import {formatDateLong, formatPrice, formatUuidWithPrefix} from "../../utils";

const tableHeaders = ['Producto', 'Cantidad', 'Total'];
export const Order = () => {
    const {id} = useParams<{ id: string }>()
    const navigate = useNavigate();
    const {data: order, isError, isLoading} = useOrder(id || '');
    if (isLoading || !order) return <Loading/>;


    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <div className='flex flex-col gap-8'>
                    <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
                        <button
                            className='w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-full text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors duration-200'
                            onClick={() => navigate(-1)}
                        >
                            <IoChevronBack className="w-4 h-4"/>
                            Volver a los pedidos
                        </button>
                        <div className='flex flex-col items-center gap-1.5'>
                            <h1 className='text-3xl font-bold'>Pedido #{formatUuidWithPrefix(id || '')}</h1>
                            <p className='text-sm text-gray-600'>
                                {formatDateLong(order.createAt)}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-xl font-semibold">Detalles del pedido</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                <tr>
                                    {tableHeaders.map((header) => (
                                        <th
                                            key={header}
                                            className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
                                                header === 'Producto' ? 'text-left' : 'text-center'
                                            }`}
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {order.orderItems.map((product, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-20 w-20">
                                                    <img className="h-20 w-20 rounded-md object-contain"
                                                         src={product.productImage} alt={product.productName}/>
                                                </div>
                                                <div className="ml-4">
                                                    <div
                                                        className="text-sm font-medium text-gray-900">{product.productName}</div>
                                                    <div
                                                        className="text-sm text-gray-500">{product.color_name} / {product.storage}</div>
                                                    <div
                                                        className="text-sm font-medium text-gray-900">{formatPrice(product.price)}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                                            <div className="flex justify-center items-center h-full">
                                                {product.quantity}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                                            <div className="flex justify-center items-center h-full">
                                                {formatPrice(product.price * product.quantity)}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row gap-8'>
                        <div className="flex-1 bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-xl font-semibold">Resumen del pedido</h2>
                            </div>
                            <div className="p-6">
                                <div className='space-y-2 text-sm'>
                                    <div className='flex justify-between'>
                                        <span>Subtotal</span>
                                        <span>{formatPrice(order.totalAmount)}</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span>Envío (Standard)</span>
                                        <span>{formatPrice(0)}</span>
                                    </div>
                                    <div
                                        className='flex justify-between font-medium text-lg pt-2 border-t border-gray-200'>
                                        <span>Total</span>
                                        <span>{formatPrice(order.totalAmount)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-xl font-semibold">Dirección de envío</h2>
                            </div>
                            <div className="p-6">
                                <div className='space-y-4'>
                                    <div>
                                        <h3 className='font-medium'>Cliente:</h3>
                                        <p>{order.customer.full_name}</p>
                                    </div>
                                    <div>
                                        <h3 className='font-medium'>Dirección:</h3>
                                        <address className='not-italic'>
                                            <p>{order.address.addressLine1}</p>
                                            {order.address.addressLine2 && <p>{order.address.addressLine2}</p>}
                                            <p>{order.address.city}, {order.address.state} {order.address.postalCode}</p>
                                            <p>{order.address.country}</p>
                                        </address>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}