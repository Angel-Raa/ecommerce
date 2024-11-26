import {Login, Register} from "../../utils";
import {supabase} from "../../supabase/client";

export const signUp = async ({
                                 fullName, email, password, phone
                             }: Register) => {
    try {
        // 1. Crear o Registrar usuario
        const {error, data} = await supabase.auth.signUp({email, password});
        if (error) throw new Error(error.message);
        const userId = data.user?.id;
        if (!userId) {
            throw new Error(`User already exists`);
        }
        const {error: err} = await supabase.auth.signInWithPassword({email, password});
        if (err) {
            throw new Error('Email o contraseña incorrectos');
        }

        // 3. Insertar el rol por defecto - CUSTOMER (Cliente)
        const {error: roleError} = await supabase.from('user_role').insert({
            user_id: userId,
            role: 'CUSTOMER',
        })

        if (roleError) {
            throw new Error(`Error al registrar el rol del usuario`);
        }


        // 4. Insertar los datos del usuario en la tabla customers (Clientes)


        const {error: customerError} = await supabase.from('customers').insert({
            user_id: userId,
            full_name: fullName,
            phone,
            email,
        })
        if (customerError) {
            console.log(customerError);
            throw new Error('Error al registrar los datos del usuario');
        }


        return data;


    } catch (error) {
        console.error(error);
        throw new Error('Error al registrar el usuario ');
    }

}

export const signIn = async ({email, password}: Login) => {
    const {data, error} = await supabase.auth.signInWithPassword({
        email, password
    })
    if (error) throw new Error(error.message);
    return data;
}

export const signOut = async () => {
    const {error} = await supabase.auth.signOut();
    if (error) throw new Error('Error al cerrar sesión');
}

export const getSession = async () => {
    const {data, error} = await supabase.auth.getSession();
    if (error) throw new Error('Error al obtener la sesión');
    return data;
}

export const getUser = async (userId:string) => {
    const {error, data} = await supabase.from('customers').select('*').eq('user_id', userId).single();
    if (error) {
        console.log(error.message);
        throw new Error('Error');
    }
    return data;


}