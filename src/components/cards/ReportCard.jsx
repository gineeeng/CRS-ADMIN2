import { MdOutlineLocalPolice } from "react-icons/md";
import { VictoryPie, VictoryLabel } from "victory";
import { ResponsiveContainer } from "recharts";

const ReportCard = ({
  label,
  totalReport,
  totalSolvedReport,
  totalOngoingReports,
}) => {
  return (
    <div className="card bg-[#191919]">
      <div className="card-inner">
        <h3 className="text-2xl font-bold">{label} Reported</h3>
        <MdOutlineLocalPolice className="card_icon" />
      </div>
      <h1 className="text-2xl font-bold">{totalReport}</h1>
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
          colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
          labelComponent={
            <VictoryLabel
              style={{ fontSize: 18, fontWeight: "bold", fill: "white" }}
            />
          }
        />
      </ResponsiveContainer>
    </div>
  );
};

export default ReportCard;
