import {create, StateCreator} from "zustand";
import {devtools} from "zustand/middleware";

type Content = 'cart' | 'search' | null
export interface GlobalStore {
    isSheetOpen: boolean;
    isSheetClosed: boolean;
    sheetContent: Content;
    activeNavMobile:boolean;
    setActiveNavMobile:(active:boolean)=>void;
    openSheet:(content:Content) => void;
    closeSheet:() => void;
}
const storeApi:StateCreator<GlobalStore> = (set) => ({
    isSheetOpen:false,
    isSheetClosed:false,
    sheetContent:null,
    activeNavMobile:false,
    setActiveNavMobile:(active:boolean)=>{
        set({activeNavMobile:active});
    },
    openSheet:(content:Content) => {

        set({isSheetOpen:true, sheetContent:content});
    },
    closeSheet:() =>{

        set({isSheetOpen:false, sheetContent:null});
    }
})
export const useGlobalStore = create<GlobalStore>()(devtools(storeApi));