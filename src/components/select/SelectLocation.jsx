import { sitioData } from "../../mocks/sitioData";

const SelectLocation = ({ selectedLocation, setSelectedLocation }) => {
  return (
    <select
      value={selectedLocation}
      onChange={(e) => setSelectedLocation(e.target.value)}
      className="px-5 py-2 fs-5 rounded-lg text-lg w-full sm:w-fit bg-gray-200 dark:bg-[#191919]"
    >
      <option value=" ">All Locations</option>
      {sitioData.map((location, index) => (
        <option key={index} value={location}>
          {location}
        </option>
      ))}
    </select>
  );
};

export default SelectLocation;
