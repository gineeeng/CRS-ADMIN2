import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import axios from "axios";
import Cookies from "js-cookie";

const View = ({ id }) => {
  const token = Cookies.get("token");
  const [modal, setModal] = useState(false);
  const [accidentDetails, setAccidentDetails] = useState(null);
  const [userDetails, setUserDetails] = useState("");

  useEffect(() => {
    if (modal) {
      fetchAccident();
      fetchUser();
    }
  }, [token, modal]);

  const fetchAccident = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_CRS_API_KEY}/api/reports/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAccidentDetails(response.data);
      fetchUser(response.data.userId);
    } catch (error) {
      console.error("Error fetching Reports details:", error);
    }
  };

  const fetchUser = async (userId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_CRS_API_KEY}/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserDetails(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleChange = (e) => {
    e.stopPropagation();
    setModal(!modal);
  };
  return (
    <div>
      <button
        type="button"
        onClick={handleChange}
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 
        focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 
        dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        View
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      {modal && (
        <div className="modal">
          <div className="modal-box">
            {accidentDetails && (
              <div>
                <div className="flex gap-2 justify-between">
                  <div className="text-xl font-semibold mb-2 p-2 rounded-md">
                    {accidentDetails.type}
                  </div>
                  <div className="bg-green-500 text-white text-xl font-bold mb-2 p-2 rounded-md">
                    {accidentDetails.action_status}
                  </div>
                </div>
                {accidentDetails.photoURL && (
                  <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    onSwiper={(swiper) => console.log(swiper)}
                  >
                    {accidentDetails.photoURL.map((url, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={url}
                          alt={`Reports ${index + 1}`}
                          className="rounded-md"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
                {accidentDetails.videoURL && (
                  <video
                    className="w-full "
                    style={{ maxHeight: 300 }}
                    controls
                  >
                    <source src={accidentDetails.videoURL} />
                  </video>
                )}

                <h3 className="font-bold text-2xl">
                  {accidentDetails.description}
                </h3>
                <p>
                  Location:{" "}
                  {`${accidentDetails.location.barangay}, ${accidentDetails.location.municipality}`}
                </p>
                <p>
                  Number of Casualties:{" "}
                  {accidentDetails.numberOfCasualties
                    ? accidentDetails.numberOfCasualties
                    : "none"}
                </p>
                <p>
                  number of Injuries:{" "}
                  {accidentDetails.numberOfInjuries
                    ? accidentDetails.numberOfInjuries
                    : "none"}
                </p>
                <p>
                  Number pf Casualties:{" "}
                  {accidentDetails.numberOfCasualties
                    ? accidentDetails.numberOfCasualties
                    : "none"}
                </p>
                <p>
                  Injury Severity:{" "}
                  {accidentDetails.injurySeverity
                    ? accidentDetails.injurySeverity
                    : "none"}
                </p>

                <p>
                  Reported by: {userDetails.name ? userDetails.name : "loading"}
                </p>
              </div>
            )}
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default View;
