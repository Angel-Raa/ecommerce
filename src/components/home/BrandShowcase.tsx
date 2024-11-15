interface Props {
    image: string,
    alt: string
}

export const BrandShowcase = ({image, alt}: Props): React.JSX.Element => {
    return (
        <>

            <div className="p-4 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                <img
                    className="max-h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                    src={image}
                    alt={alt}
                />
            </div>
        </>
    )
}