import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { TableProduct } from "../../components";

export const DashboardProductos = () => {
  return (
    <>
      <div className="h-full flex flex-col gap-2">
        <Link
          to={"/dashboard/productos/new"}
          className="bg-black text-white flex items-center self-end py-[6px] px-2 rounded-md text-sm gap-1 font-semibold"
        >
          <IoAddCircleOutline className="inline-block" />
          Nuevo Productos
        </Link>

        <TableProduct />
      </div>
    </>
  );
};
