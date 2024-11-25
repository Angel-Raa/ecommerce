import {JSX} from "react";
import {Separator} from "../shared/separator/Separator";

const availableBrands = [
    'Samsung',
    'Apple',
    'Huawei',
    'Xiaomi',
];

interface Props {
    selectedBrands: string[];
    setSelectBrands: (selectedBrand: string[]) => void;
}

export const FilterBar = ({selectedBrands, setSelectBrands}: Props): JSX.Element => {
    const handleBrandChange = (brand: string) => {
        if (selectedBrands.includes(brand)) {
            setSelectBrands(selectedBrands.filter(b => b !== brand));
        } else {
            setSelectBrands([...selectedBrands, brand]);
        }


    }

    return (
        <>
            <div className="p-5 border border-slate-200 rounded-lg h-fit col-span-2 lg:col-span-1">
                <h3 className="font-semibold text-xl mb-4">
                    Filtros
                </h3>
                <Separator/>
                <div className="flex flex-col gap3 ">
                    <h3 className="text-lg font-medium text-black">
                        Marcas
                    </h3>
                    <div className="flex flex-col gap2 ">
                        {
                            availableBrands.map((brand: string): JSX.Element => (
                                <label key={brand} className="inline-flex items-center">
                                    <input type={"checkbox"}
                                           onChange={() => handleBrandChange(brand)}
                                           checked={selectedBrands.includes(brand)}
                                           className="text-black border-black focus:ring-black accent-black "
                                           id={brand}/>
                                    <span className="ml-2 text-black text-sm cursor-pointer">{brand}</span>
                                </label>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}