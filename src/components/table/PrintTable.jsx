const PrintTable = ({ headers, data, componentRef }) => {
  return (
    <div ref={componentRef}>
      {data.length === 0 ? (
        "No Data Available"
      ) : (
        <table className="table-auto bg-white border-collapse border w-full">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="text-black text-sm font-semibold text-center border border-black p-1"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item._id}>
                <td className="text-black text-sm font-base text-center border border-black p-1">
                  {index + 1}
                </td>
                <td className="text-black text-sm font-base text-center border border-black p-1">
                  {item.type}
                </td>
                <td className="text-black text-sm font-base text-center border border-black p-1">
                  {item.numberOfCasualties || "none"}
                </td>
                <td className="text-black text-sm font-base text-center border border-black p-1">
                  {item.numberOfInjuries || "none"}
                </td>
                <td className="text-black text-sm font-base text-center border border-black p-1">
                  {item.injurySeverity || "none"}
                </td>
                <td className="text-black text-sm font-base text-center border border-black p-1">
                  {new Date(item.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td className="text-black text-sm font-base text-center border border-black p-1">
                  {item.street || "none"}
                </td>
                <td className="text-black text-sm font-base text-center border border-black p-1">
                  {item.action_status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PrintTable;
