import Select from "react-select";
import Delete from "../modal/Delete";
import View from "../modal/View";
import Restore from "../modal/Restore";
import { useLocation } from "react-router-dom";

const DataTable = ({ data, actionStatus, updateActionStatus }) => {
  const location = useLocation();
  const isArchive = location.pathname === "/dashboard/archive";

  const headers = [
    "ID",
    "Type",
    "Date",
    "Location",
    "Action Status",
    "Action",
  ];

  return (
    <div className="overflow-x-auto mt-4 justify-center min-h-screen">
      <table className="table justify-center bg-gray-200 dark:bg-[#191919]">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="text-gray-600 dark:text-white text-lg font-semibold text-center"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id}>
              <td className="text-gray-600 dark:text-white text-md font-base text-center">
                {index + 1}
              </td>
              <td className="text-gray-600 dark:text-white text-md font-base text-center">
                {item.type}
              </td>
              <td className="text-gray-600 dark:text-white text-md font-base text-center">
                {new Date(item.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
              <td className="text-gray-600 dark:text-white text-md font-base text-center">
                {`${item.location.street}`}
              </td>
              <td className="text-black text-md font-base text-center">
                <Select
                  options={[
                    { value: "Under Investigation", label: "Under Investigation" },
                    { value: "Solved", label: "Solved" },
                    { value: "Case Closed", label: "Case Closed" },
                  ]}
                  value={{
                    value: actionStatus[index] || "Under Investigation",
                    label: actionStatus[index] || "Under Investigation",
                  }}
                  onChange={(selectedOption) =>
                    updateActionStatus(item._id, index, item.userId, selectedOption.value)
                  }
                  className="px-2 py-1 fs-5 rounded-lg text-md"
                />
              </td>

              <td className="flex items-center justify-center">
                <div className="mr-1">
                  {isArchive ? <Restore id={item._id} /> : <Delete id={item._id}/>}
                </div>
                <div className="mr-1">
                  <View id={item._id} userId={item.userId} />
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
