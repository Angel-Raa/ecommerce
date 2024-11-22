import {formatPrice} from "../../utils";
import {ImageGallery, ProductDescription, Separator} from "../../components";
import React from "react";
import {Counter} from "../../components/single-product/Counter";
import {useParams} from "react-router";
import {CiDeliveryTruck} from "react-icons/ci";
import {Link} from "react-router-dom";
import {BsChatLeftText} from "react-icons/bs";

export  const PhoneDetail = ():React.JSX.Element => {
    const {slug} = useParams<{slug:string}>();
    console.log(slug);
    return (
        <>
            <div className="h-fit flex flex-col md:flex-row md:justify-around gap-16 mt-8">

                {/** TODO Grid Imagenes*/}
                <ImageGallery images={[]} />
                <div className="flex-1 space-y-5">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Samsung A55-5
                    </h1>
                    <div className="flex gap-5 items-center">
                        <span className="tracking-wide text-ls font-medium">{formatPrice(2300)} </span>
                        <div className="relative">
                            {/** TODO Agotado*/}
                        </div>
                    </div>

                    <Separator/>
                    {/** TODO Caracteristicas*/}
                    <ul className={"space-y-2 ml-7 my-10"}>
                        <li className="text-sm flex items-center gap-2 tracking-tight font-medium">
                            <span className="bg-black w-[5px] h-[5px] rounded-full"/>
                            250GB de almacenamiento
                        </li>
                    </ul>
                    {/** TODO descripcion*/}
                    <div className="flex flex-col gap-3">
                        <p>
                            Color: Rojo
                        </p>
                        <div className="flex gap-3">
                            <button className={`w-8 h-8 rounded-full flex justify-center items-center ${
                                true ? 'border border-slate-800' : ''
                            }`}>
                                <span className="w-[26px] h-[26px] rounded-full" style={{
                                    backgroundColor: 'blue'
                                }}/>
                            </button>
                        </div>

                    </div>

                    {/** TODO Opciones de men*/}

                    <div className="flex flex-col gap-3">
                        <p className="text-xs font-medium">
                            Almacenamiento disponible
                        </p>
                        <div className="flex gap-3">
                            <select className="border border-gray-700 rounded-lg px-3 py-2">
                                <option value={''}>250GB</option>
                            </select>
                        </div>
                    </div>
                    {/** TODO compra */}
                    {
                        false ? (<button
                                className={"bg-[#f3f3f3] uppercase font-medium tracking-wide text-xs py-4 rounded-full transition-all duration-300 hover:bg-[#e2e2e2] w-full "}
                                disabled={true}>Agostado</button>)
                            :
                            (
                                (<Counter/>)
                            )
                    }


                    {/** Envío **/}
                    <div className='flex pt-2'>
                        <div className='flex flex-col gap-1 flex-1 items-center'>
                            <CiDeliveryTruck size={35}/>
                            <p className='text-xs font-semibold'>Envío gratis</p>
                        </div>

                        <Link
                            to='#'
                            className='flex flex-col gap-1 flex-1 items-center justify-center'
                        >
                            <BsChatLeftText size={30}/>
                            <p className='flex flex-col items-center text-xs'>
								<span className='font-semibold'>
									¿Necesitas ayuda?
								</span>
                                Contáctanos aquí
                            </p>
                        </Link>
                    </div>

                </div>
            </div>
            {/* DESCRIPCIÓN */}
            <ProductDescription content={null}/>
        </>
    )
}