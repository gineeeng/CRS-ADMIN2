import Select from "react-select";
import Delete from "../modal/Delete";
import View from "../modal/View";

const CrimeDataTable = ({ data, actionStatus, updateActionStatus }) => {
  const headers = [
    "ID",
    "Crime Type",
    "Murder Type",
    "Description",
    "No. of casualties",
    "No. of Injuries",
    "Injury Severity",
    "Date",
    "Location",
    "Action Status",
    "Action",
  ];

  return (
    <div className="overflow-x-auto mt-4 justify-center min-h-screen	">
      <table className="table justify-center bg-[#191919] ">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="text-white text-lg font-semibold text-center"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((crime, index) => (
            <tr key={crime._id}>
              <td className="text-white text-md font-base text-center">
                {index + 1}
              </td>
              <td className="text-white text-md font-base text-center">
                {crime.type}
              </td>
              <td className="text-white text-md font-base text-center">
                {crime.murderType ? crime.murderType : "none"}
              </td>
              <td className="text-white text-md font-base text-center">
                {crime.description ? crime.description : "none"}
              </td>
              <td className="text-white text-md font-base text-center">
                {crime.numberOfCasualties ? crime.numberOfCasualties : "none"}
              </td>
              <td className="text-white text-md font-base text-center">
                {crime.numberOfInjuries ? crime.numberOfInjuries : "none"}
              </td>
              <td className="text-white text-md font-base text-center">
                {crime.injurySeverity ? crime.injurySeverity : "none"}
              </td>
              <td className="text-white text-md font-base text-center">
                {new Date(crime.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
              <td className="text-white text-md font-base text-center">
                {`${crime.location.barangay}, ${crime.location.municipality}`}
              </td>
              <td className="text-black text-md font-base text-center">
                <Select
                  options={[
                    { value: "Pending", label: "Pending" },
                    { value: "InProgress", label: "In Progress" },
                    { value: "Solved", label: "Solved" },
                    { value: "Closed Case", label: "Closed Case" },
                  ]}
                  value={{
                    value: actionStatus[index] || "InProgress",
                    label: actionStatus[index] || "In Progress",
                  }}
                  onChange={(selectedOption) =>
                    updateActionStatus(index, selectedOption.value)
                  }
                  className="px-2 py-1 fs-5 rounded-lg text-md"
                />
              </td>
              <td className="flex items-center justify-center">
                <div className="mr-1">
                  <Delete id={crime._id} />
                </div>
                <div className="mr-1">
                  <View id={crime._id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrimeDataTable;
