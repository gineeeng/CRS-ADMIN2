import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import axios from "axios";
import Cookies from "js-cookie";

const FindUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState("");
  const [reports, setReports] = useState([]);
  const token = Cookies.get("token");
  const [reportedCrimes, setReportedCrimes] = useState([]);
  const [reportedSolvedCrimes, setReportedSolvedCrimes] = useState([]);
  const [reportedUnsolvedCrimes, setReportedUnsolvedCrimes] = useState([]);
  const [reportedAccidents, setReportedAccidents] = useState([]);
  const [reportedSolvedAccidents, setReportedSolvedAccidents] = useState([]);
  const [reportedUnsolvedAccidents, setReportedUnsolvedAccidents] = useState(
    []
  );

  useEffect(() => {
    getUserInfo();
    getReports();
    getReportedCrimes();
    getReportedSolvedCrimes();
    getReportedUnsolvedCrimes();
    getReportedAccidents();
    getReportedSolvedAccidents();
    getReportedUnsolvedAccidents();
  }, []);

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

  const getReports = () => {
    axios
      .get(`${import.meta.env.VITE_CRS_API_KEY}/api/users/${id}/reports`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setReports(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reports", error);
      });
  };

  const getReportedCrimes = () => {
    axios
      .get(`${import.meta.env.VITE_CRS_API_KEY}api/users/${id}/crime`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setReportedCrimes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reported crimes:", error);
      });
  };

  const getReportedSolvedCrimes = () => {
    axios
      .get(`${import.meta.env.VITE_CRS_API_KEY}/api/users/${id}/crime/solved`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setReportedSolvedCrimes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reported solved crimes:", error);
      });
  };

  const getReportedUnsolvedCrimes = () => {
    axios
      .get(
        `${import.meta.env.VITE_CRS_API_KEY}/api/users/${id}/crime/unsolved`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setReportedUnsolvedCrimes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reported unsolved crimes:", error);
      });
  };

  const getReportedAccidents = () => {
    axios
      .get(`${import.meta.env.VITE_CRS_API_KEY}/api/users/${id}/accident`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setReportedAccidents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reported accidents:", error);
      });
  };

  const getReportedSolvedAccidents = () => {
    axios
      .get(
        `${import.meta.env.VITE_CRS_API_KEY}/api/users/${id}/accident/solved`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setReportedSolvedAccidents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reported solved accidents:", error);
      });
  };

  const getReportedUnsolvedAccidents = () => {
    axios
      .get(
        `${import.meta.env.VITE_CRS_API_KEY}/api/users/${id}/accident/unsolved`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setReportedUnsolvedAccidents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reported unsolved accidents:", error);
      });
  };

  return (
    <div className="container mx-auto text-white">
      <h1 className="text-3xl font-semibold mb-4">User Information</h1>

      <div className="mb-4 flex items-center gap-4">
        <img
          className="rounded-full w-20 h-20 object-cover"
          src={
            user.profilePic
              ? user.profilePic
              : "https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg"
          }
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
        <h1 className="text-2xl font-bold">Reported Crimes</h1>
        <div className="flex flex-wrap gap-2 mt-2 text-white">
          <div className="bg-[#191919] rounded-lg p-3 text-dark">
            <h2 className="text-2xl font-bold">Total Reported Crimes</h2>
            <p>{reportedCrimes.length}</p>
          </div>
          <div className="bg-[#191919] rounded-lg p-3 text-dark">
            <h2 className="text-2xl font-bold">Total Reported Solved Crimes</h2>
            <p>{reportedSolvedCrimes.length}</p>
          </div>
          <div className="bg-[#191919] rounded-lg p-3 text-dark">
            <h2 className="text-2xl font-bold">Total Reported Solved Crimes</h2>
            <p>{reportedUnsolvedCrimes.length}</p>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold">Reported Accidents</h1>
        <div className="flex flex-wrap gap-2 mt-2 text-white">
          <div className="bg-[#191919] rounded-lg p-3 text-dark">
            <h2 className="text-2xl font-bold">Total Reported Accidents</h2>
            <p>{reportedAccidents.length}</p>
          </div>
          <div className="bg-[#191919] rounded-lg p-3 text-dark">
            <h2 className="text-2xl font-bold">
              Total Reported Solved Accidents
            </h2>
            <p>{reportedSolvedAccidents.length}</p>
          </div>
          <div className="bg-[#191919] rounded-lg p-3 text-dark">
            <h2 className="text-2xl font-bold">
              Total Reported Solved Accidents
            </h2>
            <p>{reportedUnsolvedAccidents.length}</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        {reports.map((report, index) => (
          <div key={index} className="mb-6 p-4 border rounded-lg shadow-md">
            <div>
              <div className="flex justify-between">
                <div className="text-xl font-semibold mb-2">
                  {report.reportType} | {report.type}
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
                        className="rounded-md"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
              <h3 className="font-bold text-2xl mt-2 mb-4">
                {report.description}
              </h3>
              <p>
                <span className="font-semibold">Location:</span>{" "}
                {`${report.location.barangay}, ${report.location.municipality}`}
              </p>
              <p>
                <span className="font-semibold">Number of Casualties:</span>{" "}
                {report.numberOfCasualties ? report.numberOfCasualties : "none"}
              </p>
              <p>
                <span className="font-semibold">Number of Injuries:</span>{" "}
                {report.numberOfInjuries ? report.numberOfInjuries : "none"}
              </p>
              <p>
                <span className="font-semibold">Number of Casualties:</span>{" "}
                {report.numberOfCasualties ? report.numberOfCasualties : "none"}
              </p>
              <p>
                <span className="font-semibold">Injury Severity:</span>{" "}
                {report.injurySeverity ? report.injurySeverity : "none"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindUser;
