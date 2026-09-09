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

    if (!priceElement || !changeElement || !statusElement) {
        console.error("XAUUSD market elements not found.");
        return;
    }

    try {

        const response = await fetch(
            `${SUPABASE_URL}/functions/v1/market-data?symbol=XAU%2FUSD`,
            {
                method: "GET",
                headers: {
                    "apikey": SUPABASE_ANON_KEY,
                    "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
                }
            }
        );

        const data = await response.json();

        console.log("XAUUSD market response:", data);

        if (!response.ok || data.status === "error" || data.error) {
            throw new Error(
                data.message ||
                data.error ||
                "Unable to load market data"
            );
        }

        const price = Number(data.close);
        const change = Number(data.change);
        const percent = Number(data.percent_change);

        priceElement.textContent = price.toFixed(2);

        changeElement.textContent =
            (change >= 0 ? "+" : "") +
            change.toFixed(2) +
            " (" +
            (percent >= 0 ? "+" : "") +
            percent.toFixed(2) +
            "%)";

        changeElement.style.color =
            change >= 0 ? "#20c66b" : "#ff4d4d";

        statusElement.textContent =
            data.is_market_open
                ? "🟢 Market data connected"
                : "🟡 Market currently closed";

    } catch (error) {

        console.error("XAUUSD market error:", error);

        priceElement.textContent = "Unavailable";
        changeElement.textContent = "--";
        statusElement.textContent =
            "🔴 Unable to connect to market data";
    }
}

document.addEventListener("DOMContentLoaded", loadXAUUSD);
