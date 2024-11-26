import {useNavigate} from "react-router";
import {formatDate, formatPrice, getStatus, OrderItem} from "../../utils";


const tableHeaders = ['Referencia', 'Fecha', 'Estado', 'Total'];

interface Props {
    orders: OrderItem[]
}

export const Table = ({orders}: Props) => {
    const navigate = useNavigate();


    return (
        <>

            <div className={"relative w-full h-full"}>
                <table className={"text-sm w-full caption-bottom overflow-auto "}>
                    <thead className={"text-sm border-b border border-gray-200 pb-3"}>
                    <tr className={"text-sm font-bold"}>
                        {
                            tableHeaders.map(header => (
                                <th key={header} className={"h-12 px-4 text-left"}>
                                    {header}
                                </th>
                            ))

                        }
                    </tr>

                    </thead>
                    <tbody className={"&_tr:last-child]:border-0"}>
                    {
                        orders.map(order => (
                            <tr key={order.id}
                                className={"cursor-pointer hover:bg-gray-100 transition-colors duration-300"}
                                onClick={() => navigate(`/account/pedidos/${order.id}`)}
                            >

                                <td className={"p-4 font-medium tracking-tighter"}>
                                    {order.id}
                                </td>
                                <td className={"p-4 font-medium tracking-tighter"}>
                                    {formatDate(order.created_at)}
                                </td>
                                <td className={"p-4 font-medium tracking-tighter"}>
                                    {getStatus(order.status)}
                                </td>
                                <td className={"p-4 font-medium tracking-tighter"}>
                                    {formatPrice(order.total_amount)}
                                </td>


                            </tr>


                        ))


                    }


                    </tbody>
                </table>

            </div>

        </>
    )
}