import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import useFetchData from "../hooks/useFetchData";
import useUpdateActionStatus from "../hooks/useUpdateActionStatus";
import useFilteredData from "../hooks/useFilteredData";
import SelectLocation from "../components/select/SelectLocation";
import SelectMonth from "../components/select/SelectMonth";
import SelectStatusTab from "../components/select/SelectStatusTab";
import SearchBar from "../components/input/Searchbar";
import Loader from "../components/Loader";
import DataTable from "../components/table/DataTable";


const Accident = () => {
  const token = Cookies.get("token");
  const { data, loading } = useFetchData(
    `${import.meta.env.VITE_CRS_API_KEY}/api/reports/accidents`
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedTab, setSelectedTab] = useState("All");
  const [actionStatus, setActionStatus] = useState([]);

  const updateActionStatus = useUpdateActionStatus(data, actionStatus, setActionStatus, token, toast);
  const filteredData = useFilteredData(data, searchQuery, selectedLocation, selectedMonth, selectedTab);

  useEffect(() => {
    if (data) {
      const initialActionStatus = data.map((data) => data.action_status);
      setActionStatus(initialActionStatus);
    }
  }, [data]);

  if (loading) return <Loader />;
 
  return (
    <div className="p-2 justify-center text-4xl">
      <h1 className="font-semibold mt-4 text-white">Accident Reports</h1>
      <div className="flex flex-wrap gap-5 mt-4">
        <SelectLocation
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
        <SelectMonth
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
      </div>
      <SelectStatusTab
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <DataTable
        data={filteredData}
        actionStatus={actionStatus}
        updateActionStatus={updateActionStatus}
      />
    </div>
  );
};

export default Accident;
