const SUPABASE_URL = "https://qqavebqfrbkvbxsrtqke.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_lGWnmqnaz8H6R_2qIJQO3A_o0W2rc8K";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

async function testSupabaseConnection() {
    const statusElement = document.getElementById("supabase-status");
    const detailsElement = document.getElementById("supabase-details");

    if (!statusElement || !detailsElement) {
        return;
    }

    statusElement.textContent = "🟡 CONNECTING...";
    detailsElement.textContent = "Contacting Supabase database...";

    try {
        const { data, error } = await supabaseClient
            .from("market_instruments")
            .select("symbol, name")
            .eq("is_active", true);

        if (error) {
            throw error;
        }

        statusElement.textContent = "🟢 SUPABASE CONNECTED";
        detailsElement.textContent =
            `Database online • ${data.length} active markets found`;
    } catch (error) {
        console.error("Supabase connection error:", error);

        statusElement.textContent = "🔴 CONNECTION FAILED";
        detailsElement.textContent =
            error.message || "Unable to connect to Supabase";
    }
}

document.addEventListener("DOMContentLoaded", testSupabaseConnection);
