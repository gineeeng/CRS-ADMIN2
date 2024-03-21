const SelectStatusTab = ({ selectedTab, setSelectedTab }) => {
  return (
    <div className="mt-4">
      <div className="flex flex-wrap justify-center sm:justify-start ">
        {["All", "Pending", "InProgress", "Solved", "Closed Case"].map(
          (status) => (
            <button
              key={status}
              className={`tab text-lg font-semibold ${selectedTab === status ? "active-tab bg-[#191919] rounded text-white" : "text-white"}`}
              onClick={() => setSelectedTab(status)}
            >
              <span className="tab-name">{status}</span>
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default SelectStatusTab;
