const SUPABASE_URL = "https://qqavebqfrbkvbxsrtqke.supabase.co";
const SUPABASE_ANON_KEY = "PASTE_YOUR_PUBLISHABLE_KEY_HERE";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

console.log("LEHULA Trading Hub connected to Supabase");
