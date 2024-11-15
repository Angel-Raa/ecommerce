import {BrandShowcase} from "./BrandShowcase";

const brands = [
    {
        image: '/img/brands/apple-logo.webp',
        alt: 'Apple',
    },
    {
        image: '/img/brands/samsung-logo.webp',
        alt: 'Samsung',
    },
    {
        image: '/img/brands/xiaomi-logo.webp',
        alt: 'Xiaomi',
    },
    {
        image: '/img/brands/huawei-logo.png',
        alt: 'Huawei',
    },


];

export const Brands = () => {
    return (
        <>
            <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex flex-col items-center gap-6">
                    <div className="text-center space-y-4">
                        <h2 className="font-bold text-2xl sm:text-3xl leading-tight text-gray-900">
                            Marcas disponibles
                        </h2>
                        <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-600">
                            Tenemos lo más moderno en tecnología y los últimos modelos de
                            celulares disponibles
                        </p>
                    </div>

                    <div className="w-full">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
                            {brands.map(item => (
                                <BrandShowcase key={item.alt} {...item} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}