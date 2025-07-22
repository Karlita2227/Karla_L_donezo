import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log("Supabase client initialized:", supabaseUrl, supabaseAnonKey ? 'key loaded' : 'key missing');
console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Key Present:", !!supabaseAnonKey);

export default supabase;
