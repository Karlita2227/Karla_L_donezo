import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log("Supabase client initalized:", supabaseUrl,  supabaseAnonKey ? 'key loaded' : 'key missing');

export default supabase;
