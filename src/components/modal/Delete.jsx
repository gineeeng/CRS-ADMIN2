import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
Cookies

const Delete = ({id}) => {
  const token = Cookies.get("token");
  const [modal, setModal] = useState(false);

  const handleDelete = async () => {
    await axios.delete(`${import.meta.env.VITE_CRS_API_KEY}/api/reports/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium 
        rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
          Delete
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are sure to delete this accident?
          </h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleChange}>
              Close
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="btn focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium 
              rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delete;
