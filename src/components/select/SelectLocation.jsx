const SelectLocation = ({ selectedLocation, setSelectedLocation }) => {
  const locations = [
    "",
    "Bacayao Norte, Dagupan City",
    "Bacayao Sur, Dagupan City",
    "Bolosan, Dagupan City",
    "Bonuan Binloc, Dagupan City",
    "Bonuan Boquig, Dagupan City",
    "Bonuan Gueset, Dagupan City",
    "Calmay, Dagupan City",
    "Carael, Dagupan City",
    "Caranglaan, Dagupan City",
    "Herrero, Dagupan City",
    "Lasip Chico, Dagupan City",
    "Lasip Grande, Dagupan City",
    "Lomboy, Dagupan City",
    "Lucao, Dagupan City",
    "Malued, Dagupan City",
    "Mamalingling, Dagupan City",
    "Mangin, Dagupan City",
    "Mayombo, Dagupan City",
    "Pantal, Dagupan City",
    "Poblacion Oeste, Dagupan City",
    "Pogo Chico, Dagupan City",
    "Pogo Grande, Dagupan City",
    "Pugaro Suit, Dagupan City",
    "Salapingao, Dagupan City",
    "Salisay, Dagupan City",
    "Tambac, Dagupan City",
    "Tapuac, Dagupan City",
    "Tebeng, Dagupan City",
  ];

  return (
    <select
      value={selectedLocation}
      onChange={(e) => setSelectedLocation(e.target.value)}
      className="px-5 py-2 fs-5 rounded-lg text-lg w-full sm:w-fit bg-[#191919]"
    >
      {locations.map((location, index) => (
        <option key={index} value={location}>
          {location || "All Locations"}
        </option>
      ))}
    </select>
  );
};

export default SelectLocation;
