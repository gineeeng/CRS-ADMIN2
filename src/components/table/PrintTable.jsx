const PrintTable = ({ headers, data, componentRef }) => {
  return (
    <div ref={componentRef} className="p-5 overflow-auto">
      <table className="table-auto w-full bg-white border-collapse border">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="text-black text-lg font-semibold text-center border border-black p-2"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id}>
              <td className="text-black text-md font-base text-center border border-black p-2">
                {index + 1}
              </td>
              <td className="text-black text-md font-base text-center border border-black p-2">
                {item.type}
              </td>
              <td className="text-black text-md font-base text-center border border-black p-2">
                {item.numberOfCasualties || "none"}
              </td>
              <td className="text-black text-md font-base text-center border border-black p-2">
                {item.numberOfInjuries || "none"}
              </td>
              <td className="text-black text-md font-base text-center border border-black p-2">
                {item.injurySeverity || "none"}
              </td>
              <td className="text-black text-md font-base text-center border border-black p-2">
                {new Date(item.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
              <td className="text-black text-md font-base text-center border border-black p-2">
                {`${item.location.barangay}, ${item.location.municipality}`}
              </td>
              <td className="text-black text-md font-base text-center border border-black p-2">
                {item.action_status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrintTable;
