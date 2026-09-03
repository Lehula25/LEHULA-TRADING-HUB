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
// ===== LIVE XAUUSD MARKET DATA =====

async function loadXAUUSD() {
    const priceElement = document.getElementById("price-XAUUSD");
    const changeElement = document.getElementById("change-XAUUSD");
    const statusElement = document.getElementById("market-status");

    try {
        const response = await fetch(
            "https://qqavebqfrbkvbxsrtqke.supabase.co/functions/v1/market-data?symbol=XAU/USD"
        );

        const data = await response.json();

        if (!response.ok || data.status === "error") {
            throw new Error(data.message || "Unable to load market data");
        }

        priceElement.textContent = Number(data.close).toFixed(2);

        const change = Number(data.change);
        const percent = Number(data.percent_change);

        changeElement.textContent =
            (change >= 0 ? "+" : "") +
            change.toFixed(2) +
            " (" +
            (percent >= 0 ? "+" : "") +
            percent.toFixed(2) +
            "%)";

        changeElement.style.color = change >= 0 ? "#20c66b" : "#ff4d4d";

        statusElement.textContent =
            data.is_market_open
                ? "🟢 Market data connected"
                : "🟡 Market currently closed";

    } catch (error) {

        console.error("XAUUSD market error:", error);

        priceElement.textContent = "Unavailable";
        changeElement.textContent = "--";
        statusElement.textContent = "🔴 Unable to connect to market data";
    }
}

loadXAUUSD();
