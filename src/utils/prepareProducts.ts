
export const prepareProducts =  (product:any[]) => {

    return product.map((product:any) => {
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.image[0],
            description: product.description,
            slug: product.slug,
            variant: product.variant,
        }
    })
}