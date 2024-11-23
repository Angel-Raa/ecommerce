import {supabase} from "../../supabase/client";
import {Product} from "../../utils";


export const getProducts = async (): Promise<Product[]> => {
    const {data: products, error} = await supabase
        .from('products')
        .select('*, variants(*)')
        .order('created_at', {ascending: false});

    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }

    return products;
};

export const getFilteredProducts = async ({page = 1, brands = []}: {
    page: number
    brands: string[]
}) => {
    const itemsPerPage = 10;
    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    let query = supabase.from('products').select("*, variants(*)", {count: 'exact'}).order('created_at', {ascending: false}).range(from, to);
    if (brands.length > 0) {
        query = query.in('brand', brands);

    }

    const {data, error, count} = await query;
    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }

    return {
        data, count
    }
}

export const getRecentProducts = async () => {

    const {data: products, error} = await supabase
        .from('products')
        .select('*, variants(*)')
        .order('created_at', {ascending: false}).limit(4)

    //console.log(`Recent product ${JSON.stringify(products)} products`);
    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }

    return products
}

export const getRandomProducts = async () => {

    const {data: products, error} = await supabase
        .from('products')
        .select('*, variants(*)')
        .limit(20);

    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }

    const random = products.sort(() => 0.5 - Math.random()).slice(0, 4);


    //console.log(`Random products for ${JSON.stringify(products)} products`);

    return random;
}

export const getProductBySlug = async (slug: string) => {
    const {data, error} = await supabase.from('products').select('*, variants(*)').eq('slug', slug).single();
    if (error) {
        console.error(error.message);
        throw new Error(error.message);
    }

    return data;
}

export const searchProduct = async (search: string) => {
    const {data, error} = await supabase.from('products')
        .select('*, variants(*)').ilike('name', `%${search}%`);
    if (error) {
        console.error(error.message);
        throw new Error(error.message);
    }

    return data;
}