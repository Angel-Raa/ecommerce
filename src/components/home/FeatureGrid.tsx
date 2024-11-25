import {MdLocalShipping} from "react-icons/md";
import {FaHammer} from "react-icons/fa";
import {HiMiniReceiptRefund} from "react-icons/hi2";
import {BiWorld} from "react-icons/bi";
import {FeatureItem} from "./FeatureItem";


const features = [
    {
        icon: <MdLocalShipping size={40} className='text-slate-600'/>,
        title: 'Envío gratis',
        description: 'En todos nuestros productos',
    },
    {
        icon: <HiMiniReceiptRefund size={40} className='text-slate-600'/>,
        title: 'Devoluciones',
        description: 'Devuelve el equipo si no te satisface la compra dentro de 72 horas',
    },
    {
        icon: <FaHammer size={40} className='text-slate-600'/>,
        title: 'Soporte 24/7',
        description: 'Soporte técnico en cualquier momento',
    },
    {
        icon: <BiWorld size={40} className='text-slate-600'/>,
        title: 'Garantía',
        description: 'Garantía de 1 año en todos los equipos',
    },
];

export const FeatureGrid = (): React.JSX.Element => {
    return (
        <>

            <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map(feature => (
                        <FeatureItem key={feature.title} {...feature} />
                    ))}
                </div>
            </div>
        </>
    )
}