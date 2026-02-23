const SearchBar = ({ symbol, setSymbol, fetchStock }) => {
  return (
    <div className="flex justify-center gap-3 mb-10">
      <input
        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                   focus:ring-2 focus:ring-blue-400 focus:outline-none"
        placeholder="Search stock (AAPL, TSLA, RELIANCE.NS)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
      />

      <button
        onClick={fetchStock}
        className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow 
                   hover:bg-blue-700 transition cursor-pointer"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
