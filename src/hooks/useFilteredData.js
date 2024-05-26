import { useState, useEffect } from "react";

const useFilteredData = (
  data,
  searchQuery,
  selectedLocation,
  selectedMonth,
  selectedTab,
  selectedCategory
) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const seen = new Set();
    const filteredAndSortedData = data
      .filter((item) => {
        const searchString = searchQuery.toLowerCase();
        const crimeMonth = new Date(item.date).toLocaleString("default", {
          month: "long",
        });
        const uniqueKey = `${item.type}-${item.date}`;

        if (seen.has(uniqueKey)) {
          return false;
        }

        seen.add(uniqueKey);

        const matchesSearch = item.location.barangay
          .toLowerCase()
          .includes(searchString);
        const matchesLocation =
          !selectedLocation || `${item.location.street}` === selectedLocation;

        const matchesMonth = !selectedMonth || crimeMonth === selectedMonth;

        const matchesStatus =
          (selectedTab === "All" && item.action_status !== "Archive") ||
          item.action_status === selectedTab;

        const matchesCategory =
          !selectedCategory || item.reportType === selectedCategory;

        return (
          matchesSearch &&
          matchesLocation &&
          matchesMonth &&
          matchesStatus &&
          matchesCategory
        );
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    setFilteredData(filteredAndSortedData);
  }, [
    data,
    searchQuery,
    selectedLocation,
    selectedMonth,
    selectedTab,
    selectedCategory,
  ]);

  return filteredData;
};

export default useFilteredData;
