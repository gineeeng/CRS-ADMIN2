import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const ReadyToPrintUserTable = ({ data }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const headers = ["ID", "Name", "Contact No.", "Address", "Status"];

  return (
    <div>
      <button
        onClick={handlePrint}
        className="px-5 py-2 fs-5 rounded-lg text-lg w-full sm:w-fit bg-[#191919]"
      >
        Print
      </button>
      <div className="hidden">
        <table
          ref={componentRef}
          className="table justify-center bg-white border-collapse border"
        >
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="text-black text-lg font-semibold text-center border border-black py-2"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item._id}>
                <td className="text-black text-md font-base text-center border border-black">
                  {index + 1}
                </td>
                <td className="text-black text-md font-base text-center border border-black">
                  {item.name}
                </td>
                <td className="text-black text-md font-base text-center border border-black">
                  {item.contact_no}
                </td>
                <td className="text-black text-md font-base text-center border border-black">
                  {`${
                    item.address.houseNumber
                      ? `#${item.address.houseNumber}, `
                      : ""
                  } ${
                    item.address.street ? `${item.address.street}, ` : ""
                  } Brgy.${item.address.barangay}, 
                  ${item.address.municipality},   ${item.address.province}, ${
                    item.address.country
                  }`}
                </td>
                <td className="text-black text-md font-base text-center border border-black">
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReadyToPrintUserTable;
