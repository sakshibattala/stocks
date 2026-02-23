const StockCard = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow p-5 border border-gray-200">
      <h2 className="text-xl font-semibold mb-2">{data.symbol}</h2>

      <p>
        <strong>Price:</strong> {data.regularMarketPrice}
      </p>
      <p>
        <strong>High:</strong> {data.regularMarketDayHigh}
      </p>
      <p>
        <strong>Low:</strong> {data.regularMarketDayLow}
      </p>
      <p>
        <strong>Change:</strong> {data.regularMarketChange}
      </p>

      <p
        className={`${data.regularMarketChange > 0 ? "text-green-600" : "text-red-600"}`}
      >
        <strong>Change %:</strong> {data.regularMarketChangePercent}%
      </p>
    </div>
  );
};

export default StockCard;
