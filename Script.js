const SUPABASE_URL = "https://qqavebqfrbkvbxsrtqke.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_lGWnmqnaz8H6R_2qIJQO3A_o0W2rc8K";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

console.log("LEHULA Trading Hub connected to Supabase");
