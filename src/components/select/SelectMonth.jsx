const SelectMonth = ({ selectedMonth, setSelectedMonth }) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <select
      value={selectedMonth}
      onChange={(e) => setSelectedMonth(e.target.value)}
      className="px-5 py-2 fs-5 rounded-lg text-lg w-full sm:w-fit bg-[#191919]"
    >
      <option value="">All Months</option>
      {months.map((month, index) => (
        <option key={index} value={month}>{month}</option>
      ))}
    </select>
  );
};

export default SelectMonth;
