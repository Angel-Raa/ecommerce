import { FaBoxOpen, FaCartShopping } from "react-icons/fa6";
import { DashboardLink } from "../../utils";
import { Logo } from "../shared/logo/‎Logo";
import { NavLink } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { signOut } from "../../actions";

const dashboardLinks: DashboardLink[] = [
  {
    id: 1,
    title: "Productos",
    href: "/dashboard/productos",
    icon: <FaBoxOpen size={30} />,
  },
  {
    id: 2,
    title: "Ordenes",
    href: "/dashboard/ordenes",
    icon: <FaCartShopping size={30} />,
  },
];
export const Sidebar = () => {
  const handleLogout = async () => {
    await signOut();
  };
  return (
    <>
      <div className="w-[120px] bg-stone-800 text-white flex flex-col gap-10 items-center p-5 fixed h-screen lg:w-[250px]  ">
        <Logo isDashboard />
        <nav className="w-full space-y-5 flex-1">
          {dashboardLinks.map((link) => (
            <NavLink
              className={({ isActive }) =>
                `flex items-center justify-center gap-3 pl-0 py-3 transition-all duration-300 rounded-md ${
                  isActive
                    ? "text-white bg-cyan-600"
                    : "hover:text-white hover:bg-cyan-600"
                } lg:pl-5 lg:justify-start`
              }
              key={link.id}
              to={link.href}
            >
              {link.icon}
              <p className="font-semibold hidden lg:block">{link.title}</p>
            </NavLink>
          ))}
        </nav>
        <button
          className={
            "bg-red-500 w-full py-[10px]  rounded-md flex items-center justify-center gap-2  font-semibold text-sm hover:underline          "
          }
          onClick={handleLogout}
        >
          <span className="hidden lg:block">Cerrar session</span>
          <IoLogOutOutline size={25} className="inline-block" />
        </button>

        <p className="text-sm text-center hidden lg:block ">
          &copy; 2025 - Todos los derechos reservados
        </p>
        <p className="text-sm text-center lg:hidden">
          &copy;
          2025
        </p>
      </div>
    </>
  );
};
