import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import Cookies from "js-cookie";
import ReportCard from "../components/cards/ReportCard";

const Welcome = () => {
  const token = Cookies.get("token");
  const [crimeData, setCrimeData] = useState([]);
  const [accidentData, setAccidentData] = useState([]);
  const [arsonData, setArsonData] = useState([]);
  const [hazardData, setHazardData] = useState([]);
  const [unSolvedCrimeData, setUnSolvedCrimeData] = useState([]);
  const [solvedCrimeData, setSolvedCrimeData] = useState([]);
  const [unSolvedAccidentData, setUnSolvedAccidentData] = useState([]);
  const [solvedAccidentData, setSolvedAccidentData] = useState([]);
  const [unSolvedArsonData, setUnsolvedArsonData] = useState([]);
  const [solvedArsonData, setSolvedArsonData] = useState([]);
  const [unSolvedHazardData, setUnsolvedHazardData] = useState([]);
  const [solvedHazardData, setSolvedHazardData] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState("month");
  useEffect(() => {
    getCrimes();
    getAccidents();
    getArsons();
    getHazards();
    getUnsolvedCrime();
    getSolvedCrime();
    getUnsolvedAccident();
    getSolvedAccident();
    getSolvedArson();
    getUnsolvedArson();
    getSolvedHazard();
    getUnsolvedHazard();
  }, []);

  const getCrimes = () => {
    axios
      .get(`${import.meta.env.VITE_CRS_API_KEY}/api/reports/crimes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setCrimeData(result.data);
      })
      .catch((err) => console.log(err));
  };

  const getAccidents = () => {
    axios
      .get(`${import.meta.env.VITE_CRS_API_KEY}/api/reports/accidents`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setAccidentData(result.data);
      })
      .catch((err) => console.log(err));
  };

  const getArsons = () => {
    axios
      .get(`${import.meta.env.VITE_CRS_API_KEY}/api/reports/arsons`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setArsonData(result.data);
      })
      .catch((err) => console.log(err));
  };

  const getHazards = () => {
    axios
      .get(`${import.meta.env.VITE_CRS_API_KEY}/api/reports/hazards`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setHazardData(result.data);
      })
      .catch((err) => console.log(err));
  };

  const getUnsolvedCrime = () => {
    axios
      .get(`${import.meta.env.VITE_CRS_API_KEY}/api/reports/crimes/unsolved`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setUnSolvedCrimeData(result.data);
      })
      .catch((err) => console.log(err));
  };

  const getSolvedCrime = () => {
    axios
      .get(`${import.meta.env.VITE_CRS_API_KEY}/api/reports/crimes/solved`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setSolvedCrimeData(result.data);
      })
      .catch((err) => console.log(err));
  };

  const getUnsolvedAccident = () => {
    axios
      .get(
        `${import.meta.env.VITE_CRS_API_KEY}/api/reports/accidents/unsolved`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        setUnSolvedAccidentData(result.data);
      })
      .catch((err) => console.log(err));
  };

  const getSolvedAccident = () => {
    axios
      .get(`${import.meta.env.VITE_CRS_API_KEY}/api/reports/accidents/solved`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setSolvedAccidentData(result.data);
      })
      .catch((err) => console.log(err));
  };

  const getSolvedArson = () => {
    axios
      .get(`${import.meta.env.VITE_CRS_API_KEY}/api/reports/arsons/solved`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setSolvedArsonData(result.data);
      })
      .catch((err) => console.log(err));
  };

  const getUnsolvedArson = () => {
    axios
      .get(`${import.meta.env.VITE_CRS_API_KEY}/api/reports/arsons/unsolved`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setUnsolvedArsonData(result.data);
      })
      .catch((err) => console.log(err));
  };

  const getSolvedHazard = () => {
    axios
      .get(`${import.meta.env.VITE_CRS_API_KEY}/api/reports/hazards/solved`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setSolvedHazardData(result.data);
      })
      .catch((err) => console.log(err));
  };

  const getUnsolvedHazard = () => {
    axios
      .get(`${import.meta.env.VITE_CRS_API_KEY}/api/reports/hazards/unsolved`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setUnsolvedHazardData(result.data);
      })
      .catch((err) => console.log(err));
  };

  const combineData = () => {
    const combinedData = [];
    const allCrimeData = [...solvedCrimeData, ...unSolvedCrimeData];
    const allAccidentData = [...solvedAccidentData, ...unSolvedAccidentData];
    const allArsonData = [...solvedArsonData, ...unSolvedArsonData];
    const allHazardData = [...solvedHazardData, ...unSolvedHazardData];

    let groupedData = {};

    if (filterCriteria === "month") {
      groupedData = groupDataByMonth(
        allCrimeData,
        allAccidentData,
        allArsonData,
        allHazardData
      );
      const allMonths = Object.keys(groupedData);
      const currentYear = new Date().getFullYear();
      const monthsInYear = 12;
      for (let i = 0; i < monthsInYear; i++) {
        const monthName = new Date(currentYear, i).toLocaleString("default", {
          month: "long",
        });
        if (!allMonths.includes(monthName)) {
          groupedData[monthName] = {
            solvedCrime: 0,
            unSolvedCrime: 0,
            solvedAccident: 0,
            unSolvedAccident: 0,
            solvedArson: 0,
            unSolvedArson: 0,
            solvedHazard: 0,
            unSolvedHazard: 0,
          };
        }
      }
    } else if (filterCriteria === "day") {
      groupedData = groupDataByDay(
        allCrimeData,
        allAccidentData,
        allArsonData,
        allHazardData
      );
      const allDays = Object.keys(groupedData);

      const weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      for (let i = 0; i < weekdays.length; i++) {
        const dayName = weekdays[i];
        if (!allDays.includes(dayName)) {
          groupedData[dayName] = {
            solvedCrime: 0,
            unSolvedCrime: 0,
            solvedAccident: 0,
            unSolvedAccident: 0,
            solvedArson: 0,
            unSolvedArson: 0,
            solvedHazard: 0,
            unSolvedHazard: 0,
          };
        }
      }
    } else if (filterCriteria === "year") {
      groupedData = groupDataByYear(
        allCrimeData,
        allAccidentData,
        allArsonData,
        allHazardData
      );
    }

    Object.keys(groupedData).forEach((key) => {
      combinedData.push({
        date: key,
        ...groupedData[key],
      });
    });

    return combinedData;
  };

  const groupDataByMonth = (crimeData, accidentData) => {
    const groupedData = {};

    const allDates = [
      ...new Set(
        crimeData
          .map((item) => item.date)
          .concat(accidentData.map((item) => item.date))
      ),
    ];
    allDates.forEach((date) => {
      const month = new Date(date).toLocaleString("default", { month: "long" });
      if (!groupedData[month]) {
        groupedData[month] = {
          solvedCrime: 0,
          unSolvedCrime: 0,
          solvedAccident: 0,
          unSolvedAccident: 0,
          solvedArson: 0,
          unSolvedArson: 0,
          solvedHazard: 0,
          unSolvedHazard: 0,
        };
      }

      groupedData[month].solvedCrime += countSolvedCrimesOnDate(date);
      groupedData[month].unSolvedCrime += countUnsolvedCrimesOnDate(date);
      groupedData[month].solvedAccident += countSolvedAccidentsOnDate(date);
      groupedData[month].unSolvedAccident += countUnsolvedAccidentsOnDate(date);
      groupedData[month].solvedArson += countSolvedArsonsOnDate(date);
      groupedData[month].unSolvedArson += countUnsolvedArsonsOnDate(date);
      groupedData[month].solvedHazard += countSolvedHazardsOnDate(date);
      groupedData[month].unSolvedHazard += countUnsolvedHazardsOnDate(date);
    });

    return groupedData;
  };

  const groupDataByDay = (crimeData, accidentData) => {
    const groupedData = {};

    const allDates = [
      ...new Set(
        crimeData
          .map((item) => item.date)
          .concat(accidentData.map((item) => item.date))
      ),
    ];
    allDates.forEach((date) => {
      const dayOfWeek = new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
      });
      if (!groupedData[dayOfWeek]) {
        groupedData[dayOfWeek] = {
          solvedCrime: 0,
          unSolvedCrime: 0,
          solvedAccident: 0,
          unSolvedAccident: 0,
          solvedArson: 0,
          unSolvedArson: 0,
          solvedHazard: 0,
          unSolvedHazard: 0,
        };
      }

      groupedData[dayOfWeek].solvedCrime += countSolvedCrimesOnDate(date);
      groupedData[dayOfWeek].unSolvedCrime += countUnsolvedCrimesOnDate(date);
      groupedData[dayOfWeek].solvedAccident += countSolvedAccidentsOnDate(date);
      groupedData[dayOfWeek].unSolvedAccident += countUnsolvedAccidentsOnDate(date);
      groupedData[dayOfWeek].solvedArson += countSolvedArsonsOnDate(date);
      groupedData[dayOfWeek].unSolvedArson += countUnsolvedArsonsOnDate(date);
      groupedData[dayOfWeek].solvedHazard += countSolvedHazardsOnDate(date);
      groupedData[dayOfWeek].unSolvedHazard += countUnsolvedHazardsOnDate(date);
    });

    return groupedData;
  };

  const groupDataByYear = (crimeData, accidentData) => {
    const groupedData = {};

    const allDates = [
      ...new Set(
        crimeData
          .map((item) => item.date)
          .concat(accidentData.map((item) => item.date))
      ),
    ];
    allDates.forEach((date) => {
      const year = new Date(date).getFullYear();
      if (!groupedData[year]) {
        groupedData[year] = {
          solvedCrime: 0,
          unSolvedCrime: 0,
          solvedAccident: 0,
          unSolvedAccident: 0,
          solvedArson: 0,
          unSolvedArson: 0,
          solvedHazard: 0,
          unSolvedHazard: 0,
        };
      }

      groupedData[year].solvedCrime += countSolvedCrimesOnDate(date);
      groupedData[year].unSolvedCrime += countUnsolvedCrimesOnDate(date);
      groupedData[year].solvedAccident += countSolvedAccidentsOnDate(date);
      groupedData[year].unSolvedAccident += countUnsolvedAccidentsOnDate(date);
      groupedData[year].solvedArson += countSolvedArsonsOnDate(date);
      groupedData[year].unSolvedArson += countUnsolvedArsonsOnDate(date);
      groupedData[year].solvedHazard += countSolvedHazardsOnDate(date);
      groupedData[year].unSolvedHazard += countUnsolvedHazardsOnDate(date);
    });

    return groupedData;
  };

  const countSolvedCrimesOnDate = (date) => {
    return solvedCrimeData.filter((item) => item.date === date).length;
  };

  const countUnsolvedCrimesOnDate = (date) => {
    return unSolvedCrimeData.filter((item) => item.date === date).length;
  };

  const countSolvedAccidentsOnDate = (date) => {
    return solvedAccidentData.filter((item) => item.date === date).length;
  };

  const countUnsolvedAccidentsOnDate = (date) => {
    return unSolvedAccidentData.filter((item) => item.date === date).length;
  };

  const countSolvedArsonsOnDate = (date) => {
    return solvedArsonData.filter((item) => item.date === date).length;
  };
  
  const countUnsolvedArsonsOnDate = (date) => {
    return unSolvedArsonData.filter((item) => item.date === date).length;
  };
  
  const countSolvedHazardsOnDate = (date) => {
    return solvedHazardData.filter((item) => item.date === date).length;
  };
  
  const countUnsolvedHazardsOnDate = (date) => {
    return unSolvedHazardData.filter((item) => item.date === date).length;
  };

  const totalCrime = crimeData.length;
  const totalAccident = accidentData.length;
  const totalArson = arsonData.length;
  const totalHazard = hazardData.length;

  const totalSolvedCrime = crimeData.filter(
    (crime) => crime.action_status === "Solved"
  ).length;

  const totalSolvedAccident = accidentData.filter(
    (crime) => crime.action_status === "Solved"
  ).length;

  const totalSolvedArson = arsonData.filter(
    (crime) => crime.action_status === "Solved"
  ).length;

  const totalSolvedHazard = hazardData.filter(
    (crime) => crime.action_status === "Solved"
  ).length;

  const totalOngoingCrimes = crimeData.filter(
    (crime) => crime.action_status === "InProgress" || crime.action_status === "Pending"
  ).length;
  
  const totalOngoingAccident = accidentData.filter(
    (crime) => crime.action_status === "InProgress" || crime.action_status === "Pending"
  ).length;
  
  const totalOngoingArson = arsonData.filter(
    (crime) => crime.action_status === "InProgress" || crime.action_status === "Pending"
  ).length;
  
  const totalOngoingHazard = hazardData.filter(
    (crime) => crime.action_status === "InProgress" || crime.action_status === "Pending"
  ).length;
  
  return (
    <main className="p-2">
      <div className="main-title font-semibold mb-2 mt-4">
        <h3 className="text-white">Admin Dashboard</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
        <ReportCard
          label="Accident"
          totalReport={totalAccident}
          totalSolvedReport={totalSolvedAccident}
          totalOngoingReports={totalOngoingAccident}
        />

        <ReportCard
          label="Arson"
          totalReport={totalArson}
          totalSolvedReport={totalSolvedArson}
          totalOngoingReports={totalOngoingArson}
        />

        <ReportCard
          label="Crime"
          totalReport={totalCrime}
          totalSolvedReport={totalSolvedCrime}
          totalOngoingReports={totalOngoingCrimes}
        />

        <ReportCard
          label="Hazard"
          totalReport={totalHazard}
          totalSolvedReport={totalSolvedHazard}
          totalOngoingReports={totalOngoingHazard}
        />
      </div>
      <div className="text-xl font-semibold m-3 text-white">
        <label htmlFor="filterCriteria">Filter Graph Criteria: </label>
        <select
          id="filterCriteria"
          value={filterCriteria}
          onChange={(e) => setFilterCriteria(e.target.value)}
          className="bg-[#191919] text-white rounded p-2"
        >
          <option value="month">Month</option>
          <option value="day">Day</option>
          <option value="year">Year</option>
        </select>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2">
        <div className="flex flex-col gap-3">
          <div className="crime-chart bg-[#191919] rounded-lg p-2">
            <h2 className="text-xl m-2 font-semibold">Crimes</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={combineData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="solvedCrime" name="Solved Crime" fill="#8884d8" />
                <Bar
                  dataKey="unSolvedCrime"
                  name="Unsolved Crime"
                  fill="#82ca9d"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="accident-chart bg-[#191919] rounded-lg p-2">
            <h2 className="text-xl m-2 font-semibold">Accidents</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={combineData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="solvedAccident"
                  name="Solved Accident"
                  fill="#8884d8"
                />
                <Bar
                  dataKey="unSolvedAccident"
                  name="Unsolved Accident"
                  fill="#82ca9d"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="crime-chart bg-[#191919] rounded-lg p-2">
            <h2 className="text-xl m-2 font-semibold">Arsons</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={combineData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="solvedArson" name="Solved Arson" fill="#8884d8" />
                <Bar
                  dataKey="unSolvedArson"
                  name="Unsolved Arson"
                  fill="#82ca9d"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="accident-chart bg-[#191919] rounded-lg p-2">
            <h2 className="text-xl m-2 font-semibold">Hazards</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={combineData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="solvedHazard"
                  name="Solved Hazard"
                  fill="#8884d8"
                />
                <Bar
                  dataKey="unSolvedHazard"
                  name="Unsolved Hazard"
                  fill="#82ca9d"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Welcome;
