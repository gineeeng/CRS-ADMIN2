import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { saveAs } from "file-saver";
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  WidthType,
} from "docx";
import generatePDF from "react-to-pdf";
import PrintTable from "./PrintTable";

const ReadyToPrintTable = ({ data }) => {
  const componentRef = useRef();
  const [printLoading, setPrintLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [wordLoading, setWordLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onBeforePrint: () => setPrintLoading(true),
    onAfterPrint: () => setPrintLoading(false),
    onPrintError: () => setPrintLoading(false),
  });

  const headers = [
    "ID",
    "Type",
    "Casualties",
    "Injuries",
    "Injury Severity",
    "Date",
    "Location",
    "Status",
  ];

  const generateWord = async () => {
    if (wordLoading) return;

    setWordLoading(true);

    try {
      const table = new Table({
        rows: [
          new TableRow({
            children: headers.map(
              (header) =>
                new TableCell({
                  children: [new Paragraph(header)],
                  width: { size: 20, type: WidthType.PERCENTAGE },
                })
            ),
          }),
          ...data.map(
            (item, index) =>
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph((index + 1).toString())],
                    margins: {
                      marginUnitType: WidthType.DXA,
                      top: 100,
                      bottom: 100,
                      left: 100,
                      right: 100,
                    },
                  }),
                  new TableCell({
                    children: [new Paragraph(item.type)],
                    margins: {
                      marginUnitType: WidthType.DXA,
                      top: 100,
                      bottom: 100,
                      left: 100,
                      right: 100,
                    },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph(`${item.numberOfCasualties}` || "none"),
                    ],
                    margins: {
                      marginUnitType: WidthType.DXA,
                      top: 100,
                      bottom: 100,
                      left: 100,
                      right: 100,
                    },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph(`${item.numberOfInjuries}` || "none"),
                    ],
                    margins: {
                      marginUnitType: WidthType.DXA,
                      top: 100,
                      bottom: 100,
                      left: 100,
                      right: 100,
                    },
                  }),
                  new TableCell({
                    children: [new Paragraph(item.injurySeverity || "none")],
                    margins: {
                      marginUnitType: WidthType.DXA,
                      top: 100,
                      bottom: 100,
                      left: 100,
                      right: 100,
                    },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph(
                        new Date(item.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      ),
                    ],
                    margins: {
                      marginUnitType: WidthType.DXA,
                      top: 100,
                      bottom: 100,
                      left: 100,
                      right: 100,
                    },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph(
                        `${item.location.barangay}, ${item.location.municipality}`
                      ),
                    ],
                    margins: {
                      marginUnitType: WidthType.DXA,
                      top: 100,
                      bottom: 100,
                      left: 100,
                      right: 100,
                    },
                  }),
                  new TableCell({
                    children: [new Paragraph(item.action_status)],
                    margins: {
                      marginUnitType: WidthType.DXA,
                      top: 100,
                      bottom: 100,
                      left: 100,
                      right: 100,
                    },
                  }),
                ],
              })
          ),
        ],
      });

      const doc = await new Document({
        sections: [
          {
            children: [table],
          },
        ],
      });

      await Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "ReportsTable.docx");
      });
    } catch (error) {
      console.error("Error generating Word document:", error);
    } finally {
      setWordLoading(false);
    }
  };

  const handlePdf = async () => {
    setIsVisible(true);

    if (pdfLoading) return;

    setPdfLoading(true);

    try {
      await generatePDF(componentRef, { filename: "ReportsTable.pdf" });
      await setIsVisible(false);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setPdfLoading(false);
      setIsVisible(false);
    }
  };

  return (
    <div>
      <button
        onClick={handlePrint}
        disabled={printLoading}
        className="px-5 py-2 fs-5 rounded-lg text-lg w-full sm:w-fit bg-gray-200 dark:bg-[#191919]"
      >
        {printLoading ? "Printing..." : "Print"}
      </button>

      <button
        onClick={handlePdf}
        disabled={pdfLoading}
        className="px-5 py-2 fs-5 rounded-lg text-lg w-full sm:w-fit bg-gray-200 dark:bg-[#191919] ml-2"
      >
        {pdfLoading ? "Downloading..." : "Download as PDF"}
      </button>

      <button
        onClick={generateWord}
        disabled={wordLoading}
        className="px-5 py-2 fs-5 rounded-lg text-lg w-full sm:w-fit bg-gray-200 dark:bg-[#191919] ml-2"
      >
        {wordLoading ? "Downloading..." : "Download as Word"}
      </button>

      <div className={`${isVisible ? "block" : "hidden"}`}>
        <PrintTable headers={headers} data={data} componentRef={componentRef} />
      </div>
    </div>
  );
};

export default ReadyToPrintTable;
