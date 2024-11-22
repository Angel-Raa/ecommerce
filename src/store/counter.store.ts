import { StateCreator, create} from "zustand";
import {devtools} from "zustand/middleware";


export  interface CounterState {
    counter: number
    increment: () => void
    decrement: () => void
}

const storeApi:StateCreator<CounterState> = (set) => ({
    counter:1,
    increment:() => {
        set(state => ({counter:state.counter + 1}))
    },
    decrement: () => {
        set(state => ({ counter: Math.max(1, state.counter - 1) }))
    }
});
export const useCounterStore = create<CounterState>()(devtools(storeApi))