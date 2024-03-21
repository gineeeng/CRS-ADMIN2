import Select from "react-select";
import Delete from "../modal/Delete";
import View from "../modal/View";

const DataTable = ({ data, actionStatus, updateActionStatus }) => {
  const headers = [
    'ID',
    'Type',
    'Description',
    'No. of casualties',
    'No. of Injuries',
    'Injury Severity',
    'Date',
    'Location',
    'Action Status',
    'Action'
  ];

  return (
    <div className="overflow-x-auto mt-4 justify-center min-h-screen">
      <table className="table justify-center bg-[#191919]">
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
          {data.map((item, index) => (
            <tr key={item._id}>
              <td className="text-white text-md font-base text-center">
                {index + 1}
              </td>
              <td className="text-white text-md font-base text-center">
                {item.type}
              </td>
              <td className="text-white text-md font-base text-center">
                {item.description || "none"}
              </td>
              <td className="text-white text-md font-base text-center">
                {item.numberOfCasualties || "none"}
              </td>
              <td className="text-white text-md font-base text-center">
                {item.numberOfInjuries || "none"}
              </td>
              <td className="text-white text-md font-base text-center">
                {item.injurySeverity || "none"}
              </td>
              <td className="text-white text-md font-base text-center">
                {new Date(item.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
              <td className="text-white text-md font-base text-center">
                {`${item.location.barangay}, ${item.location.municipality}`}
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
                  <Delete id={item._id} />
                </div>
                <div className="mr-1">
                  <View id={item._id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
