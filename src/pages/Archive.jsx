import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import useFetchData from "../hooks/useFetchData";
import useUpdateActionStatus from "../hooks/useUpdateActionStatus";
import SelectLocation from "../components/select/SelectLocation";
import SelectMonth from "../components/select/SelectMonth";
import SearchBar from "../components/input/Searchbar";
import Loader from "../components/Loader";
import DataTable from "../components/table/DataTable";
import ReadyToPrintTable from "../components/table/ReadyToPrintTable";

const Archive = () => {
  const token = Cookies.get("token");
  const { data, loading } = useFetchData(
    `${import.meta.env.VITE_CRS_API_KEY}/api/reports/`
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [actionStatus, setActionStatus] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const updateActionStatus = useUpdateActionStatus(
    data,
    actionStatus,
    setActionStatus,
    token,
    toast
  );

  const filterData = () => {
    let filtered = [...data];

    if (selectedLocation) {
      filtered = filtered.filter((item) => item.location === selectedLocation);
    }

    if (selectedMonth) {
      filtered = filtered.filter((item) => item.month === selectedMonth);
    }

    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.some((data) => data.includes(searchQuery))
      );
    }

    filtered = filtered.filter((item) => item.action_status === "Archive");

    setFilteredData(filtered);
  };

  useEffect(() => {
    if (filteredData) {
      const initialActionStatus = filteredData.map(
        (data) => data.action_status
      );
      setActionStatus(initialActionStatus);
      filterData();
    }
  }, [filteredData, selectedLocation, selectedMonth, searchQuery]);
  if (loading) return <Loader />;

  return (
    <div className="p-2 justify-center text-4xl">
      <h1 className="font-semibold mt-4 text-white">Archives</h1>
      <div className="flex flex-wrap gap-5 mt-4">
        <SelectLocation
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
        <SelectMonth
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
        <ReadyToPrintTable data={filteredData} />
      </div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <DataTable
        data={filteredData}
        actionStatus={actionStatus}
        updateActionStatus={updateActionStatus}
      />
    </div>
  );
};

export default Archive;
