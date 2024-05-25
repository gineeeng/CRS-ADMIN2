import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import ReportCard from "../components/cards/ReportCard";
import useFetchData from "../hooks/useFetchData";
import Loader from "../components/Loader";
import { sitioData } from "../mocks/sitioData";

const Welcome = () => {
  const [filterCriteria, setFilterCriteria] = useState("month");
  const [reportType, setReportType] = useState("Crime");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const { data, loading } = useFetchData(
    `${import.meta.env.VITE_CRS_API_KEY}/api/reports`
  );

  if (loading) return <Loader />;

  const filteredData = data.filter(
    (item) =>
      selectedLocation === "All" || item.location.street === selectedLocation
  );

  const combineData = () => {
    let groupedData = {};

    if (filterCriteria === "month") {
      groupedData = groupDataByMonth(filteredData, reportType);
    } else if (filterCriteria === "day") {
      groupedData = groupDataByDay(filteredData, reportType);
    } else if (filterCriteria === "year") {
      groupedData = groupDataByYear(filteredData, reportType);
    }

    const combinedData = Object.keys(groupedData).map((key) => ({
      date: key,
      ...groupedData[key],
    }));

    return combinedData;
  };

  const groupDataByMonth = (data, type) => {
    const groupedData = {};

    data.forEach((item) => {
      if (item.reportType !== type) return;
      const month = new Date(item.date).toLocaleString("default", {
        month: "long",
      });
      if (!groupedData[month]) {
        groupedData[month] = {
          solved: 0,
          unsolved: 0,
        };
      }

      updateGroupedData(groupedData[month], item);
    });

    return groupedData;
  };

  const groupDataByDay = (data, type) => {
    const groupedData = {};

    data.forEach((item) => {
      if (item.reportType !== type) return;
      const dayOfWeek = new Date(item.date).toLocaleDateString("en-US", {
        weekday: "long",
      });
      if (!groupedData[dayOfWeek]) {
        groupedData[dayOfWeek] = {
          solved: 0,
          unsolved: 0,
        };
      }

      updateGroupedData(groupedData[dayOfWeek], item);
    });

    return groupedData;
  };

  const groupDataByYear = (data, type) => {
    const groupedData = {};

    data.forEach((item) => {
      if (item.reportType !== type) return;
      const year = new Date(item.date).getFullYear();
      if (!groupedData[year]) {
        groupedData[year] = {
          solved: 0,
          unsolved: 0,
        };
      }

      updateGroupedData(groupedData[year], item);
    });

    return groupedData;
  };

  const updateGroupedData = (group, item) => {
    const status = item.action_status;

    if (status === "Solved") group.solved++;
    else group.unsolved++;
  };

  const totalReports = (type) =>
    filteredData.filter((item) => item.reportType === type).length;

  const totalSolvedReports = (type) =>
    filteredData.filter(
      (item) =>
        (item.reportType === type && item.action_status === "Solved") ||
        item.action_status === "Case Closed"
    ).length;

  const totalOngoingReports = (type) =>
    filteredData.filter(
      (item) =>
        item.reportType === type && item.action_status === "Under Investigation"
    ).length;

  const getSeverityColor = (count) => {
    if (count < 3) return "#eab308";
    if (count < 6) return "#4d7c0f";
    return "#dc2626";
  };

  const combinedData = combineData().map((item) => {
    const total = item.solved + item.unsolved;
    return {
      ...item,
      color: getSeverityColor(total),
    };
  });

  return (
    <main className="p-2">
      <div className="main-title font-semibold mt-4 flex flex-wrap items-center mb-2">
        <h3>Admin Dashboard</h3>
        <div>
          <div className="text-xl font-bold">
            <label htmlFor="filterCriteria">Filter Graph Criteria: </label>
            <select
              id="filterCriteria"
              value={filterCriteria}
              onChange={(e) => setFilterCriteria(e.target.value)}
              className="bg-gray-400 dark:bg-[#2e2e2e] rounded p-2"
            >
              <option value="month">Month</option>
              <option value="day">Day</option>
              <option value="year">Year</option>
            </select>
            <label htmlFor="reportType" className="ml-4">
              Report Type:{" "}
            </label>
            <select
              id="reportType"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="bg-gray-400 dark:bg-[#2e2e2e] rounded p-2"
            >
              <option value="Crime">Crime</option>
              <option value="Accident">Accident</option>
              <option value="Hazards">Hazard</option>
              <option value="Arson/Fire">Arson/Fire</option>
            </select>
            <label htmlFor="reportType" className="ml-4">
              Filter Location:{" "}
            </label>
            <select
              id="filterLocation"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="bg-gray-400 dark:bg-[#2e2e2e] rounded p-2"
            >
              <option value="All">All</option>
              {sitioData.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
        <ReportCard
          label="Accident"
          totalReport={totalReports("Accident")}
          totalSolvedReport={totalSolvedReports("Accident")}
          totalOngoingReports={totalOngoingReports("Accident")}
        />
        <ReportCard
          label="Arson"
          totalReport={totalReports("Arson/Fire")}
          totalSolvedReport={totalSolvedReports("Arson/Fire")}
          totalOngoingReports={totalOngoingReports("Arson/Fire")}
        />
        <ReportCard
          label="Crime"
          totalReport={totalReports("Crime")}
          totalSolvedReport={totalSolvedReports("Crime")}
          totalOngoingReports={totalOngoingReports("Crime")}
        />
        <ReportCard
          label="Hazard"
          totalReport={totalReports("Hazards")}
          totalSolvedReport={totalSolvedReports("Hazards")}
          totalOngoingReports={totalOngoingReports("Hazards")}
        />
      </div>

      <div className="w-full  border border-gray-600 rounded-lg shadow bg-gray-200 dark:bg-[#191919] dark:border-gray-200 p-2 mt-3">
        <div className="flex flex-wrap items-center justify-around p-2">
          <h2 className="text-2xl m-2 font-bold">{reportType} Reports</h2>
          <div className="flex items-center justify-center">
            <div className="text-xl m-2 font-semibold">
              Unsolved Reports:{" "}
              {
                filteredData.filter(
                  (data) => data.action_status === "Under Investigation"
                ).length
              }
            </div>
            <div className="text-xl m-2 font-semibold">
              Solved Reports:{" "}
              {
                filteredData.filter(
                  (data) =>
                    data.action_status === "Solved" ||
                    data.action_status === "Case Closed"
                ).length
              }
            </div>
            <div className="text-xl m-2 font-semibold">
              Total Reports:{" "}
              {
                filteredData.length
              }
            </div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={600}>
          <BarChart data={combinedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="solved" name="Solved">
              {combinedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
            <Bar dataKey="unsolved" name="Unsolved">
              {combinedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
};

export default Welcome;
