import { useContext } from "react";
import { MdOutlineLocalPolice } from "react-icons/md";
import { VictoryPie, VictoryLabel } from "victory";
import { ResponsiveContainer } from "recharts";
import { ThemeContext } from "../../ThemeContext";

const ReportCard = ({
  label,
  totalReport,
  totalSolvedReport,
  totalOngoingReports,
}) => {
  const { theme } = useContext(ThemeContext);
  const labelColor = theme === "dark" ? "white" : "#4b5563";

  return (
    <div className="card p-6  border border-gray-600 rounded-lg shadow bg-gray-200 dark:bg-[#191919] dark:border-gray-200">
      <div className="card-inner">
        <div className="flex items-center gap-2">
          <MdOutlineLocalPolice size={40} />

          <h3 className="text-3xl font-semibold tracking-tight">
            {label} Reported
          </h3>
        </div>
        <h1 className="text-3xl font-bold">{totalReport}</h1>
      </div>
      <ResponsiveContainer height={300}>
        <VictoryPie
          data={[
            {
              x: totalSolvedReport,
              y: totalSolvedReport,
              label: `Solved: ${totalSolvedReport}`,
            },
            {
              x: totalOngoingReports,
              y: totalOngoingReports,
              label: `Unsolved: ${totalOngoingReports}`,
            },
          ]}
          colorScale={["#4d7c0f", "#eab308"]}
          labelComponent={
            <VictoryLabel
              style={{ fontSize: 18, fontWeight: "bold", fill: labelColor }}
            />
          }
        />
      </ResponsiveContainer>
    </div>
  );
};

export default ReportCard;
