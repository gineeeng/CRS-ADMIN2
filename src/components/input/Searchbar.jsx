const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="mt-4">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="min-w-full px-5 py-2 fs-5 rounded-lg text-lg bg-[#191919]"
      />
    </div>
  );
};

export default SearchBar;