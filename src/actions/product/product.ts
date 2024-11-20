import {supabase} from "../../supabase/client";

export const getProduct = async () => {
    const {data:products, error} = await supabase.from('products').select('*').order('created_at', {ascending: false});
    if(error) {
        console.error(error.message);
        throw new Error(error.message);
    }
    return products;

}