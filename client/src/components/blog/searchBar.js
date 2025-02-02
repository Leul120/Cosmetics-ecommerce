const SearchBar = () => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search articles..."
        className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-200"
      />
    </div>
  );
};

export default SearchBar;
