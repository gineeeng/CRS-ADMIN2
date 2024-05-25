const PrintTable = ({ headers, data, componentRef }) => {
  return (
    <div ref={componentRef} className="p-5 overflow-auto">
      <table className="table-auto w-full bg-white border-collapse border">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="text-black text-lg font-semibold text-center border border-black p-4"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id}>
              <td className="text-black text-md font-base text-center border border-black p-4">
                {index + 1}
              </td>
              <td className="text-black text-md font-base text-center border border-black p-4">
                {item.type}
              </td>
              <td className="text-black text-md font-base text-center border border-black p-4">
                {item.numberOfCasualties || "none"}
              </td>
              <td className="text-black text-md font-base text-center border border-black p-4">
                {item.numberOfInjuries || "none"}
              </td>
              <td className="text-black text-md font-base text-center border border-black p-4">
                {item.injurySeverity || "none"}
              </td>
              <td className="text-black text-md font-base text-center border border-black p-4">
                {new Date(item.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
              <td className="text-black text-md font-base text-center border border-black p-4">
                {`${item.location.barangay}, ${item.location.municipality}`}
              </td>
              <td className="text-black text-md font-base text-center border border-black p-4">
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
