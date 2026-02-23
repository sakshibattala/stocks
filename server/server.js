import express from "express";
import YahooFinance from "yahoo-finance2";
import cors from "cors";

const app = express();
app.use(cors());

// Create Yahoo Finance instance (REQUIRED IN NEW VERSION)
const yahooF = new YahooFinance();

// 1️⃣ LIVE DATA (today)
app.get("/stock/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;
    const today = await yahooF.quote(symbol);
    res.json(today);
  } catch (error) {
    // console.log("LIVE DATA ERROR:", error);
    res.status(500).json({ error: "Error fetching live data" });
  }
});

// 2️⃣ YESTERDAY + TODAY
app.get("/history/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;

    const result = await yahooF.chart(symbol, {
      period1: "5d",
      interval: "1d",
    });

    const candles = result.chart.result[0].indicators.quote[0];

    const yesterday = candles.close[candles.close.length - 2];
    const today = candles.close[candles.close.length - 1];

    res.json({
      symbol,
      yesterday,
      today,
      difference: today - yesterday,
      candles,
    });
  } catch (error) {
    console.log("HISTORY ERROR:", error);
    res.status(500).json({ error: "Error fetching history data" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
