import {Link} from "react-router-dom";
import {useOrders} from "../../hook";
import {Loading, Table} from "../../components";

export const Orders = () => {
    const {data: orders, isLoading} = useOrders();

    if (isLoading || !orders) return <Loading/>;
    return (
        <>
            <div className={"flex flex-col  items-center gap-6 "}>
                <h1 className={"text-4xl font-bold  "}>
                    Pedidos
                </h1>
                <span
                    className={"h-7 w-7 rounded-full bg-black text-white text-[11px] flex justify-center items-center mt-1"}>
                    {orders.length}
                </span>
                {
                    orders.length === 0 ? (
                        <>
                            <p className={"text-slate-700 text-[13px]"}>
                                Todavia no has hecho ningun pedidos
                            </p>
                            <Link to={'/celulares'}
                                  className={"bg-black text-white uppercase font-medium tracking-wide text-sm py-4 px-8 rounded-full"}>
                                Empezar a compra
                            </Link>
                        </>

                    ) : (
                        <Table orders={orders}/>
                    )
                }
            </div>
        </>
    )
}