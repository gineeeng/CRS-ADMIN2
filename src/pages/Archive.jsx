import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import useFetchData from "../hooks/useFetchData";
import useFilteredData from "../hooks/useFilteredData";
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

  const filteredData = useFilteredData(
    data,
    searchQuery,
    selectedLocation,
    selectedMonth,
    "Archive"
  );

  const updateActionStatus = useUpdateActionStatus(
    filteredData,
    actionStatus,
    setActionStatus,
    token,
    toast
  );

  useEffect(() => {
    if (filteredData) {
      const initialActionStatus = filteredData.map(
        (data) => data.action_status
      );
      setActionStatus(initialActionStatus);
    }
  }, [filteredData]);

  if (loading) return <Loader />;

  return (
    <div className="p-2 justify-center text-4xl">
      <h1 className="font-semibold mt-4">Archives</h1>
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
      {filteredData.length === 0 ? (
        <h1 className="m-2 text-center">No reports available in archives {searchQuery && `for ${searchQuery}`}</h1>
      ) : (
        <DataTable
          data={filteredData}
          actionStatus={actionStatus}
          updateActionStatus={updateActionStatus}
        />
      )}
    </div>
  );
};

export default Archive;
