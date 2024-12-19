import { Outlet } from "react-router";
import { Sidebar } from "../components";

 const DashboardLayout = ():React.JSX.Element => {
    return (
        <>
           <div className="flex bg-gray-100 min-h-screen font-mono">
            <Sidebar />
             <main className="container m-5 mt-7 flex-1 text-sky-800 ml-[140px] lg:ml-[270px]">
             <Outlet />
             </main>
            
           </div>
        </>
    )

}

export default DashboardLayout;