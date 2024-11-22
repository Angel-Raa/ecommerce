import {LuMinus, LuPlus} from "react-icons/lu";
import React from "react";

interface Props {
    counter: number;
    increment: () => void;
    decrement: () => void;
}
export const Counter = ({counter, increment, decrement}:Props) => {
    return (
        <>
            <div className="space-y-3">
                <p className="text-sm font-medium">Cantidad:</p>
                <div className="flex gap-8 px-5 py-3 border border-slate-200 w-fit rounded-full">
                    <button onClick={decrement} disabled={counter === 1}>
                        <LuMinus size={15}/>
                    </button>
                    <span className={"text-slate-800 text-sm"}>{counter}</span>
                    <button onClick={increment}>
                        <LuPlus size={15}/>
                    </button>
                </div>
            </div>
            {/** TODO Acciones */}
            <div className="flex flex-col gap-3">
                <button>
                    Agregar al carro
                </button>
                <button
                    className='bg-black text-white uppercase font-semibold tracking-widest text-xs py-4 rounded-full'>
                    Comprar ahora
                </button>
            </div>

        </>
    )
}