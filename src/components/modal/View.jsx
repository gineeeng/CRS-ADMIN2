import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import axios from "axios";
import Cookies from "js-cookie";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

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

  const handlePdf = async () => {
    const content = componentRef.current;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    pdf.html(content, {
      callback: () => {
        pdf.save("Reports.pdf");
      },
      margin: [10, 10, 10, 10],
      html2canvas: {
        scale: 1.03,
      },
    });
  };

  const handleWord = async () => {
    try {
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Status: ${reportsDetails?.action_status || ""}`,
                    bold: true,
                    size: 32,
                    font: "Arial",
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: reportsDetails?.type || "",
                    bold: true,
                    size: 40,
                    font: "Arial",
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${reportsDetails?.location?.barangay || ""}, ${
                      reportsDetails?.location?.municipality || ""
                    }`,
                    size: 24,
                    font: "Arial",
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Number of Casualties: ${
                      reportsDetails?.numberOfCasualties || "none"
                    }`,
                    size: 24,
                    font: "Arial",
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Number of Injuries: ${
                      reportsDetails?.numberOfInjuries || "none"
                    }`,
                    size: 24,
                    font: "Arial",
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Injury Severity: ${
                      reportsDetails?.injurySeverity || "none"
                    }`,
                    size: 24,
                    font: "Arial",
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Reported by: ${userDetails?.name || "none"}`,
                    size: 24,
                    font: "Arial",
                  }),
                ],
              }),
            ],
          },
        ],
      });
  
      const blob = await Packer.toBlob(doc);
      saveAs(blob, "Report.docx");
    } catch (error) {
      console.error("Error creating Word document:", error);
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
        focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 m-2 mb-2 dark:bg-gray-800 dark:text-black dark:border-gray-600 
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
              <div ref={componentRef} className="w-full   p-2">
                <div className="text-black">
                  <h1 className="text-2xl">
                    Status: {reportsDetails.action_status}
                  </h1>
                  <div className="text-4xl font-bold mb-2">
                    {reportsDetails.type}
                  </div>

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
            <div className="modal-action flex flex-wrap justify-center items-center">
              <button
                type="button"
                onClick={handleChange}
                className="focus:outline-none text-white text-lg  bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium 
               rounded-lg px-5 py-2.5 m-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Close
              </button>
              <button
                onClick={handlePrint}
                className="px-5 py-2.5 m-2 rounded-lg text-lg sm:w-fit bg-gray-200 dark:bg-[#191919]"
              >
                Print
              </button>
              <button
                onClick={handlePdf}
                className="px-5 py-2.5 m-2 rounded-lg text-lg sm:w-fit bg-gray-200 dark:bg-[#191919]"
              >
                PDF
              </button>
              <button
                onClick={handleWord}
                className="px-5 py-2.5 m-2 rounded-lg text-lg sm:w-fit bg-gray-200 dark:bg-[#191919]"
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
