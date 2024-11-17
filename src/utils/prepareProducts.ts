import {Color, Product, VariantProduct} from "./definition";

export const prepareProducts = (products: Product[]) => {
    return products.map(product => {

        const colors = product.variants.reduce(
            (acc: Color[], variant: VariantProduct) => {
                const existingColor = acc.find(
                    item => item.color === variant.color
                );

                if (existingColor) {
                    // Si ya existe el color, comparamos los precios
                    existingColor.price = Math.min(
                        existingColor.price,
                        variant.price
                    );
                } // Mantenemos el precio mínimo
                else {
                    acc.push({
                        color: variant.color,
                        price: variant.price,
                        name: variant.color_name,
                    });
                }

                return acc;
            },
            []
        );


        const price = Math.min(...colors.map(item => item.price));


        return {
            ...product,
            price,
            colors: colors.map(({name, color}) => ({name, color})),
            variants: product.variants,
        };
    });
};