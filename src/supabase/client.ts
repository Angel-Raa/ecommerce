import { Database } from './supabase'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl:string | undefined = process.env.REACT_APP_PROJECT_URL_SUPABASE;
const supabaseKey   = process.env.REACT_APP_VITE_API_KEY;
if (!supabaseUrl || !supabaseKey) {
    throw new Error("Las variables de entorno REACT_APP_PROJECT_URL_SUPABASE o REACT_APP_VITE_API_KEY no están configuradas correctamente.");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);