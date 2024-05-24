import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Restore = ({ id }) => {
  const token = Cookies.get("token");
  const [modal, setModal] = useState(false);

  const handleRestore = async () => {
    await axios.put(
      `${import.meta.env.VITE_CRS_API_KEY}/api/reports/${id}`,
      { action_status: "Under Investigation" },

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setModal(false);
  };

  const handleChange = () => {
    setModal(!modal);
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleChange}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Restore
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box bg-lime-700">
          <h3 className="font-bold text-2xl text-white">
            Are sure to restore this incident?
          </h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleChange}>
              Close
            </button>

            <button
              type="button"
              onClick={handleRestore}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Restore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restore;
