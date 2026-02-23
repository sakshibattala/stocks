import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import StockCard from "./components/StockCard";
import { ThreeDots } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const companies = ["AAPL", "MSFT", "TSLA", "AMZN", "GOOGL", "META"];

  const [symbol, setSymbol] = useState("");
  const [searchedStock, setSearchedStock] = useState(null);
  const [stockData, setStockData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchStock = async () => {
    if (!symbol) {
      toast.error("Please enter a stock symbol");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/stock/${symbol}`,
      );
      const json = await res.json();

      if (!json.symbol) {
        toast.error("Invalid stock symbol! Try a valid one.");
        return;
      }

      setSearchedStock(json);
    } catch (err) {
      toast.error("Error fetching stock data");
    }
  };

  const fetchAllStocks = async () => {
    let updatedData = {};

    for (let symbol of companies) {
      try {
        const res = await fetch(
          `${import.meta.env.REACT_APP_BASE_URL}/stock/${symbol}`,
        );
        const json = await res.json();
        updatedData[symbol] = json;
      } catch (err) {
        console.log(`Error fetching: ${symbol}`, err);
      }
    }

    setStockData(updatedData);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllStocks();
    const interval = setInterval(fetchAllStocks, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <Toaster position="top-center" />

      <h1 className="text-3xl font-bold text-center mb-6">
        📊 Live Market Dashboard
      </h1>

      <SearchBar
        symbol={symbol}
        setSymbol={setSymbol}
        fetchStock={fetchStock}
      />

      {searchedStock && (
        <div className="max-w-md mx-auto mb-10">
          <StockCard data={searchedStock} />
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4">Popular Stocks</h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <ThreeDots height="80" width="80" color="#2563eb" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(stockData).map((data) => (
            <StockCard key={data.symbol} data={data} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
