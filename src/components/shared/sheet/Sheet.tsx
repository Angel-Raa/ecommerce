import React, {useEffect, useRef} from "react";
import {useGlobalStore} from "../../../store/global.store";
import {Cart} from "../cart/Cart";
import {Search} from "../search/Search";

export const Sheet = ():React.JSX.Element => {
    const sheetContent = useGlobalStore(state => state.sheetContent);
    const closeSheet = useGlobalStore(state => state.closeSheet);
    const sheetRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {

        document.body.style.overflow = "hidden";
        const handleOutsideClick = (event: MouseEvent) => {
             if(sheetRef.current && !sheetRef.current.contains(event.target as Node)){
                 closeSheet();
             }

        }
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener("mousedown", handleOutsideClick);
        }

    }, [closeSheet]);
    const renderContent = () => {
        switch (sheetContent){
            case 'cart' : return <Cart />
            case 'search': return <Search />
            default: return null;
        }
    }
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end animate-fade-in  ">
               <div ref={sheetRef}
                    className={"bg-white text-black h-screen w-[500px] shadow-lg animate-slide-in " }>
                   {renderContent()}
               </div>
            </div>
        </>
    )
}