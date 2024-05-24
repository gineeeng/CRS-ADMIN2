
const PrintTable = ({ headers, data, componentRef }) => {
  return (
    <table ref={componentRef} className="table justify-center bg-white border-collapse border">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="text-black text-lg font-semibold text-center border border-black py-2">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item._id}>
            <td className="text-black text-md font-base text-center border border-black">{index + 1}</td>
            <td className="text-black text-md font-base text-center border border-black">{item.type}</td>
            <td className="text-black text-md font-base text-center border border-black">{item.numberOfCasualties || "none"}</td>
            <td className="text-black text-md font-base text-center border border-black">{item.numberOfInjuries || "none"}</td>
            <td className="text-black text-md font-base text-center border border-black">{item.injurySeverity || "none"}</td>
            <td className="text-black text-md font-base text-center border border-black">
              {new Date(item.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </td>
            <td className="text-black text-md font-base text-center border border-black">
              {`${item.location.barangay}, ${item.location.municipality}`}
            </td>
            <td className="text-black text-md font-base text-center border border-black">{item.action_status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PrintTable