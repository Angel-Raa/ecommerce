import {useNavigate, useParams} from "react-router";
import {useOrder} from "../../hook";
import {Loading} from "../../components";
import {IoChevronBack} from "react-icons/io5";
import {formatDateLong, formatUuidWithPrefix} from "../../utils";

const tableHeaders = ['Producto', 'Cantidad', 'Total'];
export const Order = () => {
    const {id} = useParams<{ id: string }>()
    const navigate = useNavigate();
    const {data: order, isError, isLoading} = useOrder(id || '');
    if (isLoading || !order) return <Loading/>;


    return (
        <>
            <div className={"flex flex-col justify-between items-center gap-5 md:flex-row md:gap-0"}>
                <button
                    className={"border rounded-full py-2 border-slate-200 px-5 flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-tighter hover:bg-stone-200 transition-all"}

                    onClick={() => navigate(-1)}
                >
                    <IoChevronBack size={18}/>
                    Volver a los pedidos
                </button>
                <div className={"flex flex-col items-center gap-1.5"}>
                    <h1 className={"text-3xl font-bold "}>Pedido # {formatUuidWithPrefix(id || '')} </h1>
                    <p className={"text-sm"}>{formatDateLong(order.createAt)}</p>

                </div>

                <div></div>
                <div></div>

                <div className={"flex flex-col mt-10 mb-5 gap-10"}>
                    <table className={"text-sm w-full caption-bottom overflow-aut"}>
                        <thead>
                        <tr>
                            {tableHeaders.map((header) => (
                                <th
                                    key={header}
                                    className='h-12 text-center uppercase tracking-wide text-stone-600 font-medium'
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>

                        {
                            order.orderItems.map((orderItem, i) => (
                                <tr key={i} className={"border border-gray-300"}>
                                    <td className={"p-4 font-medium tracking-tighter flex gap-3 items-center"}>
                                        <img
                                            src={orderItem.productImage}
                                            alt={orderItem.productName}
                                            className='h-20 w-20 object-contain rounded-lg'
                                        />
                                    </td>
                                </tr>
                            ))
                        }

                        </tbody>
                    </table>

                </div>


            </div>

        </>
    )
}