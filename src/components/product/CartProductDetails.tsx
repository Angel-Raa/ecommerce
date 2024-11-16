import {JSX,  useState} from "react";
import {Link} from "react-router-dom";
import {FiPlus} from "react-icons/fi";
import {ProductColorDot} from "./ProductColorDot";
interface Props {
    img: string;
    name: string;
    price: number;
    slug: string;
    colors:{
        name: string;
        color: string;
    }[];
    variants: any[]
}

export const CartProductDetails = ({
    img, name, price, slug, colors, variants,
                                   }:Props):JSX.Element => {
    const [activeColor, setActiveColor] = useState<{name:string, color:string}>(colors[0])
    const selectedVariant = variants.find((variant) => variant.color === activeColor.name)
    const stock = selectedVariant.stock || 0
    return (
        <>
        <div className="flex flex-col gap-6 relative">
              <Link to={ `/phone/${slug}` }  className="flex relative group ">
                <div className="flex h-[360px] w-full items-center justify-center py-2 lg:h-[250px]">
                 <img src={img} alt={name} className="object-contain h-full w-full"/>
                </div>
                  <button className="bg-white border border-slate-200 absolute w-full bottom-0 py-3 rounded-3xl flex items-center justify-center gap-1 text-sm font-semibold hover:bg-stone-100 translate-y-[100%] transition-all duration-300 group-hover:translate-y-0">
                      <FiPlus size={30}/>
                      Agregar produto
                  </button>
              </Link>
            <div className="flex flex-col gap-1 items-center">
                <p className={`text-[15px] font-medium`}>
                    {name}
                </p>
                <p className={`text-[15px] font-medium`}>
                    {price}
                </p>
                <div className="flex gap-3">
                    {
                        colors.map(item => (
                            <ProductColorDot key={item.name} {...item} />
                        ))
                    }
                </div>
            </div>
            <div className="absolute top-2 left-2">
                {
                    stock === 0 && (<span>Not found</span>)
                }
            </div>

        </div>
        </>
    )
}