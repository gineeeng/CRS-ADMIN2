import { useState, useEffect } from 'react';

const useFilteredData = (data, searchQuery, selectedLocation, selectedMonth, selectedTab) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filteredData = data.filter((item) => {
      const searchString = searchQuery.toLowerCase();
      const crimeMonth = new Date(item.date).toLocaleString('default', {
        month: 'long',
      });

      const matchesSearch =
        item.location.barangay.toLowerCase().includes(searchString) ||
        item.description.toLowerCase().includes(searchString);

      const matchesLocation =
        !selectedLocation ||
        `${item.location.barangay}, ${item.location.municipality}` === selectedLocation;

      const matchesMonth = !selectedMonth || crimeMonth === selectedMonth;

      const matchesStatus = selectedTab === 'All' || item.action_status === selectedTab;

      return matchesSearch && matchesLocation && matchesMonth && matchesStatus;
    });

    setFilteredData(filteredData);
  }, [data, searchQuery, selectedLocation, selectedMonth, selectedTab]);

  return filteredData;
};

export default useFilteredData;
