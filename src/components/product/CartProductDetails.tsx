import React, {JSX, useState} from "react";
import {Link} from "react-router-dom";
import {FiPlus} from "react-icons/fi";
import {ProductColorDot} from "./ProductColorDot";
import {formatPrice, VariantProduct} from "../../utils";


interface Props {
    img: string;
    name: string;
    price: number;
    slug: string;
    colors: {
        name: string;
        color: string;
    }[];
    variants: VariantProduct[]
}

export const CartProductDetails = ({
                                       img, name, price, slug, colors, variants,
                                   }: Props): JSX.Element => {
    const [activeColor, setActiveColor] = useState<{ name: string, color: string }>(colors[0])
    const selectedVariant = variants.find((variant) => variant.color === activeColor.name)
    return (
        <>
            <div className="flex flex-col gap-6 relative">
                <Link to={`/celulares/${slug}`} className="flex relative group overflow-hidden ">
                    <div className="flex h-[360px] w-full items-center justify-center py-2 lg:h-[250px]">
                        <img src={img} alt={name} className="object-contain h-full w-full"/>
                    </div>
                    <button
                        className="bg-white border border-slate-200 absolute w-full bottom-0 py-3 rounded-3xl flex items-center justify-center gap-1 text-sm font-semibold hover:bg-stone-100 translate-y-[100%] transition-all duration-300 group-hover:translate-y-0">
                        <FiPlus size={30}/>
                        Agregar produto
                    </button>
                </Link>
                <div className="flex flex-col gap-1 items-center">
                    <p className={`text-[15px] font-medium`}>
                        {name}
                    </p>
                    <p className={`text-[15px] font-medium`}>
                        {
                            formatPrice(price)
                        }
                    </p>
                    <div className="flex gap-3">
                        {
                            colors.map(item => (
                                <ProductColorDot key={item.name} {...item} />
                            ))
                        }
                    </div>
                </div>




            </div>
        </>
    )
}