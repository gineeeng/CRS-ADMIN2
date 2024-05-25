import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import axios from "axios";
import Cookies from "js-cookie";
import { useReactToPrint } from "react-to-print";
const View = ({ id, userId }) => {
  const componentRef = useRef();
  const token = Cookies.get("token");
  const [modal, setModal] = useState(false);
  const [reportsDetails, setReportsDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    if (modal) {
      fetchReports();
      fetchUser();
    }
  }, [token, modal, id]);

  const fetchReports = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_CRS_API_KEY}/api/reports/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReportsDetails(response.data);
    } catch (error) {
      console.error("Error fetching Reports details:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_CRS_API_KEY}/api/users/${userId}`,
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

  const handleChange = () => {
    setModal(!modal);
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleChange}
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 
        focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-black dark:border-gray-600 
        dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 dark:text-white"
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
          <div className="modal-box bg-yellow-500">
            {reportsDetails && (
              <div ref={componentRef} className="p-2">
                <div className="text-black">
                  <div className="flex gap-2 justify-between">
                    <div className="text-xl font-semibold mb-2 p-2 rounded-md">
                      {reportsDetails.type}
                    </div>
                    <div className="bg-green-500 text-black text-xl font-bold mb-2 p-2 rounded-md text-white">
                      {reportsDetails.action_status}
                    </div>
                  </div>

                  {reportsDetails.photoURL && (
                    <Swiper
                      spaceBetween={50}
                      slidesPerView={1}
                      onSwiper={(swiper) => console.log(swiper)}
                    >
                      {reportsDetails.photoURL.map((url, index) => (
                        <SwiperSlide
                          key={index}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={url}
                            alt={`Reports ${index + 1}`}
                            className="rounded-md"
                            style={{
                              width: "100%",
                              maxHeight: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  )}
                  
                  {reportsDetails.videoURL && (
                    <video
                      className="w-full "
                      style={{ maxHeight: 300 }}
                      controls
                    >
                      <source src={reportsDetails.videoURL} />
                    </video>
                  )}

                  <h3 className="font-bold text-2xl">
                    {`${reportsDetails.location.barangay}, ${reportsDetails.location.municipality}`}
                  </h3>

                  <p>
                    Number of Casualties:{" "}
                    {reportsDetails.numberOfCasualties
                      ? reportsDetails.numberOfCasualties
                      : "none"}
                  </p>
                  <p>
                    Number of Injuries:{" "}
                    {reportsDetails.numberOfInjuries
                      ? reportsDetails.numberOfInjuries
                      : "none"}
                  </p>
                  <p>
                    Number of Casualties:{" "}
                    {reportsDetails.numberOfCasualties
                      ? reportsDetails.numberOfCasualties
                      : "none"}
                  </p>
                  <p>
                    Injury Severity:{" "}
                    {reportsDetails.injurySeverity
                      ? reportsDetails.injurySeverity
                      : "none"}
                  </p>

                  <p>
                    Reported by: {userDetails ? userDetails.name : "loading"}
                  </p>
                </div>
              </div>
            )}
            <div className="modal-action">
              <button
                type="button"
                onClick={handleChange}
                className="focus:outline-none text-white text-lg  bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium 
               rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Close
              </button>
              <button
                onClick={handlePrint}
                className="px-5 py-2.5 me-2 mb-2 rounded-lg text-lg sm:w-fit bg-gray-200 dark:bg-[#191919]"
              >
                Print
              </button>
              <button
                onClick={handlePrint}
                className="px-5 py-2.5 me-2 mb-2 rounded-lg text-lg sm:w-fit bg-gray-200 dark:bg-[#191919]"
              >
                PDF
              </button>
              <button
                onClick={handlePrint}
                className="px-5 py-2.5 me-2 mb-2 rounded-lg text-lg sm:w-fit bg-gray-200 dark:bg-[#191919]"
              >
                Word
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default View;
