const SelectCategory = ({ selectedCategory, setSelectedCategory }) => {
  const categories = [
    "Crime",
    "Accident",
    "Hazards",
    "Arson/Fire"
  ];

  return (
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="px-5 py-2 fs-5 rounded-lg text-lg w-full sm:w-fit bg-gray-200 dark:bg-[#191919]"
    >
      <option value="">All Categories</option>
      {categories.map((category, index) => (
        <option key={index} value={category}>{category}</option>
      ))}
    </select>
  );
};

export default SelectCategory;