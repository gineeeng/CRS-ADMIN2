import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import useFetchData from "../hooks/useFetchData";
import Loader from "../components/Loader";
import axios from "axios";
import Cookies from "js-cookie";

const FindUser = () => {
  const { id } = useParams();
  const token = Cookies.get("token");
  const [user, setUser] = useState("");
  const { data: reports, loading: reportLoading } = useFetchData(
    `${import.meta.env.VITE_CRS_API_KEY}/api/users/${id}/reports`
  );

  const getUserInfo = () => {
    axios
      .get(`${import.meta.env.VITE_CRS_API_KEY}/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user information:", error);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const reported = reports.length;
  const reportedSolved = reports.filter(
    (report) => report.action_status === "Solved"
  ).length;
  const reportedUnsolved = reports.filter(
    (report) => report.action_status !== "Solved"
  ).length;

  if (reportLoading) return <Loader />;

  return (
    <div className=" mx-auto mt-4 p-2">
      <div className="mb-4 flex items-center gap-4">
        <img
          className="rounded-full w-20 h-20 object-cover"
          src={
            user.profilePic
              ? user.profilePic
              : "https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg"
          }
          alt="Profile"
        />
        <div>
          <h1 className="text-5xl font-bold flex items-center mb-2">
            {user.name}
            <span
              className={`inline-block rounded-full w-5 h-5 ml-4 ${
                user.status === "active" ? "bg-green-300" : "bg-error"
              }`}
            ></span>
          </h1>
          <p>Contact Number: {user.contact_no}</p>
        </div>
      </div>

      <div className="mb-2">
        <div className="flex flex-wrap gap-2 mt-2">
          <div className="bg-gray-200 dark:bg-[#2e2e2e] rounded-lg p-3 text-dark">
            <h2 className="text-2xl font-bold">Total Reported Incidents</h2>
            <p>{reported}</p>
          </div>
          <div className="bg-gray-200 dark:bg-[#2e2e2e] rounded-lg p-3 text-dark">
            <h2 className="text-2xl font-bold">
              Total Reported Solved Incidents
            </h2>
            <p>{reportedSolved}</p>
          </div>
          <div className="bg-gray-200 dark:bg-[#2e2e2e] rounded-lg p-3 text-dark">
            <h2 className="text-2xl font-bold">
              Total Reported Unsolved Incidents
            </h2>
            <p>{reportedUnsolved}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {reports.map((report, index) => (
          <div key={index} className="w-full p-4 border rounded-lg shadow-md max-w-[500px]">
            <div className="flex gap-2 justify-between items-center mb-2">
              <div className="text-xl font-semibold">
                {report.reportType} | {report.type}{" "}
              </div>
              <div
                className={`px-3 py-1 rounded-md ${
                  report.action_status === "Solved"
                    ? "bg-green-500"
                    : "bg-red-500"
                } text-white font-bold text-xl`}
              >
                {report.action_status}
              </div>
            </div>
            {report.videoURL && (
              <video
                controls
                className="rounded-md w-full mb-2"
                style={{ maxHeight: 300 }}
              >
                <source src={report.videoURL} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            {report.photoURL && (
              <Swiper
                spaceBetween={50}
                slidesPerView={1}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
              >
                {report.photoURL.map((url, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={url}
                      alt={`Accident ${index + 1}`}
                      className="w-full object-cover rounded-md mb-2"
                      style={{ maxHeight: 300 }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            <div className="w-full flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-white  dark:bg-[#191919] dark:hover:bg-[#151515]">
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {report.description}
                </h5>
                <p>
                  <span className="font-semibold">Location:</span>{" "}
                  {`${report.location.barangay}, ${report.location.municipality}`}
                </p>
                <p>
                  <span className="font-semibold">Number of Casualties:</span>{" "}
                  {report.numberOfCasualties
                    ? report.numberOfCasualties
                    : "none"}
                </p>
                <p>
                  <span className="font-semibold">Number of Injuries:</span>{" "}
                  {report.numberOfInjuries ? report.numberOfInjuries : "none"}
                </p>
                <p>
                  <span className="font-semibold">Injury Severity:</span>{" "}
                  {report.injurySeverity ? report.injurySeverity : "none"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindUser;
