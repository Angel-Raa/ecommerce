import {formatPrice, ICartItem} from "../../utils";

interface Props {
    item:ICartItem
}

export const ItemsCheckout =  ({item}:Props) => {
    return (
        <>
            <li
                className='flex justify-between items-center gap-5'
            >
                <div className='flex relative border border-stone-300 bg-stone-200 rounded-md'>
                    <img
                        src={item.image}
                        alt={item.name}
                        className='w-20 h-20 object-contain'
                    />
                    <span
                        className='w-5 h-5 rounded-full bg-gray-500 text-white flex items-center justify-center text-xs absolute -right-1 -top-2 font-medium'>
								{item.quantity}
							</span>
                </div>

                <div className='flex-1 space-y-3'>
                    <div className='flex justify-between'>
                        <p className='font-semibold'>{item.name}</p>
                        <p className='text-sm font-medium text-gray-600 mt-1'>
                            {formatPrice(item.price)}
                        </p>
                    </div>
                    <div className='flex gap-3'>
                        <p className='text-[13px] text-gray-600'>
                            {item.storage} /{item.color}
                        </p>
                    </div>
                </div>
            </li>

        </>
    )
}