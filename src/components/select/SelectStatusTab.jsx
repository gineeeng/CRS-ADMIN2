const SelectStatusTab = ({ selectedTab, setSelectedTab }) => {
  return (
    <div className="mt-4">
      <div className="flex flex-wrap justify-center sm:justify-start ">
        {["All", "Under Investigation", "Solved", "Case Closed"].map(
          (status) => (
            <button
              key={status}
              className={`tab text-lg font-semibold ${
                selectedTab === status
                  ? "active-tab px-2 bg-gray-200 dark:bg-[#191919] rounded text-gray-600 dark:text-white rounded"
                  : "text-gray-600 dark:text-white"
              }`}
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
