import {formatPrice, VariantProduct} from "../../utils";
import {CellNotFound, Counter, ImageGallery, Loading, ProductDescription, Separator, Tag} from "../../components";
import React, {useEffect, useMemo, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {CiDeliveryTruck} from "react-icons/ci";
import {Link} from "react-router-dom";
import {BsChatLeftText} from "react-icons/bs";
import {useProduct} from "../../hook";
import {useCounterStore} from "../../store/counter.store";
import {useCartStore} from "../../store/cart.store";
import toast from "react-hot-toast";

interface Acc {
    [key: string]: {
        name: string;
        storages: string[];
    };
}

export const PhoneDetail = (): React.JSX.Element => {
    const {slug} = useParams<{ slug: string }>();
    const navigate= useNavigate();
    const [currentSlug, setCurrentSlug] = useState(slug)
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedStorage, setSelectedStorage] = useState<string | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<VariantProduct | null>(null);
    const {data: product, isError, isLoading} = useProduct(currentSlug || '');
    const counter = useCounterStore(state => state.counter);
    const increment = useCounterStore(state => state.increment);
    const decrement = useCounterStore(state => state.decrement);
    const addItem = useCartStore(state => state.addItem)


    // Agrupamos las variantes por color
    const colors = useMemo(() => {
        return (
            product?.variants.reduce(
                (acc: Acc, variant: VariantProduct) => {
                    const {color, color_name, storage} = variant;
                    if (!acc[color]) {
                        acc[color] = {
                            name: color_name,
                            storages: [],
                        };
                    }

                    if (!acc[color].storages.includes(storage)) {
                        acc[color].storages.push(storage);
                    }

                    return acc;
                },
                {} as Acc
            ) || {}
        );
    }, [product?.variants]);

    // Obtener el primer color predeterminado si no se ha seleccionado ninguno

    const availableColors = Object.keys(colors);
    useEffect(() => {
        if (!selectedColor && availableColors.length > 0) {
            setSelectedColor(availableColors[0]);
        }
    }, [availableColors, selectedColor])


    // Actualizar el almacenamiento seleccionado cuando cambia el color
    useEffect(() => {
        if (selectedColor && colors[selectedColor] && !selectedStorage) {
            setSelectedStorage(colors[selectedColor].storages[0]);
        }
    }, [selectedColor, colors, selectedStorage])

    // Obtener la variante seleccionada
    useEffect(() => {

        if (selectedColor && selectedStorage) {
            const variant = product?.variants.find((variant) => (
                variant.color === selectedColor && variant.storage === selectedStorage
            ))
            setSelectedVariant(variant as VariantProduct);
        }
    }, [selectedColor, selectedStorage, product?.variants]);

    // Obtener el stock
    const isOutOfStock = selectedVariant?.stock === 0;
    // Funciones para agrega a carrito
    const addToCart = () => {
        if (selectedVariant){
            addItem({
                variantId: selectedVariant.id,
                productId: product?.id || '',
                name: product?.name || '',
                image: product?.images[0] || '',
                color: selectedVariant.color_name ,
                storage: selectedVariant.storage,
                price: selectedVariant.price,
                quantity: counter
            })
            toast.success('Producto añadido al carrito', {
                position: 'top-right',
            });
        }

    }



    // Funcion para compra ahora
    const buyNow = () => {
        if (selectedVariant){
            addItem({
                variantId: selectedVariant.id,
                productId: product?.id || '',
                name: product?.name || '',
                image: product?.images[0] || '',
                color: selectedVariant.color_name ,
                storage: selectedVariant.storage,
                price: selectedVariant.price,
                quantity: counter
            })
            navigate("/checkout")

        }
    }

    // Reseatear en slug actual cuando cambiea la URL
    useEffect(() => {
        setCurrentSlug(slug);

        setSelectedVariant(null)
        setSelectedStorage(null)
        setSelectedColor(null)

    }, [slug]);

    if(isLoading) return <Loading />

    if (!product || isError) {
        return (
            <>
                <CellNotFound/>
            </>
        )
    }





    return (
        <>
            <div className="h-fit flex flex-col md:flex-row md:justify-around gap-16 mt-8">

                {/** TODO Grid Imagenes*/}
                <ImageGallery images={product.images}/>
                <div className="flex-1 space-y-5">
                    <h1 className="text-3xl font-bold tracking-tight">
                        {product.name}
                    </h1>
                    <div className="flex gap-5 items-center">
                        <span
                            className="tracking-wide text-ls font-medium">{formatPrice(selectedVariant?.price || product.variants[0].price)} </span>
                        <div className="relative">
                            {
                                isOutOfStock && (
                                    <Tag contentTag={'Agotado'} />
                                )
                            }
                        </div>
                    </div>

                    <Separator/>
                    {/** TODO Caracteristicas*/}
                    <ul className={"space-y-2 ml-7 my-10"}>

                        {
                            product.features.map((feature) => (
                                <li key={feature} className="text-sm flex items-center gap-2 tracking-tight font-medium">
                                    <span className="bg-black w-[5px] h-[5px] rounded-full"/>
                                    {feature}
                                </li>
                            ))
                        }
                    </ul>
                    {/** TODO descripcion*/}
                    <div className="flex flex-col gap-3">
                        <p>
                            Color: {selectedColor && colors[selectedColor].name}
                        </p>
                        <div className="flex gap-3">

                            {
                                availableColors.map((color) => (
                                    <button key={color} className={`w-8 h-8 rounded-full flex justify-center items-center ${
                                        selectedColor === color ? 'border border-slate-800' : ''}`} onClick={() => setSelectedColor(color)}>
                                <span className="w-[26px] h-[26px] rounded-full" style={{
                                    backgroundColor: color
                                }}/>
                                    </button>
                                ))
                            }
                        </div>

                    </div>

                    {/** TODO Opciones de men*/}

                    <div className="flex flex-col gap-3">

                        <p className="text-xs font-medium">
                            Almacenamiento disponible
                        </p>


                        {
                            selectedColor && (
                                <div className="flex gap-3">
                                    <select className="border border-gray-700 rounded-lg px-3 py-2" value={selectedStorage || '' } onChange={(e) => setSelectedStorage(e.target.value)}>
                                        {
                                            colors[selectedColor].storages.map(t => (
                                                <option key={t} value={t}>{t}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            )
                        }
                    </div>
                    {/** TODO compra */}
                    {
                        isOutOfStock ? (<button
                                className={"bg-[#f3f3f3] uppercase font-medium tracking-wide text-xs py-4 rounded-full transition-all duration-300 hover:bg-[#e2e2e2] w-full "}
                                disabled={true}>Agostado</button>)
                            :
                            (
                                (<Counter counter={counter} increment={increment} decrement={decrement}/>)
                            )
                    }


                    {/**  Acciones */}
                    <div className="flex flex-col gap-3">
                        <button onClick={ addToCart } >
                            Agregar al carro
                        </button>
                        <button
                            onClick={ buyNow }
                            className='bg-black text-white uppercase font-semibold tracking-widest text-xs py-4 rounded-full'>
                            Comprar ahora
                        </button>
                    </div>


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
            <ProductDescription content={product.description}/>
        </>
    )
}