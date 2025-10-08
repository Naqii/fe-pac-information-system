import { Button, Spinner } from "@heroui/react";
import useDetailRecap from "./useDetailRecap";
import HotTable from "@handsontable/react";
import { calculateNameColumnWidth } from "@/utils/columnName";
import { BaseRenderer, registerRenderer } from "handsontable/renderers";

const statusRenderer: BaseRenderer = (instance, td, row, col, prop, value) => {
  td.innerText = value ?? "";

  td.style.color = "#000"; // default text color
  td.style.backgroundColor = ""; // reset bg

  switch (value) {
    case "H": // Hadir
      td.style.backgroundColor = "#d1fae5"; // hijau muda
      td.style.color = "#065f46"; // hijau gelap
      break;
    case "A": // Alpa
      td.style.backgroundColor = "#fee2e2"; // merah muda
      td.style.color = "#991b1b"; // merah gelap
      break;
    case "I": // Izin
      td.style.backgroundColor = "#fef9c3"; // kuning
      td.style.color = "#92400e"; // coklat
      break;
    default:
      td.style.backgroundColor = "#fff";
      break;
  }
};

// ✅ Daftarkan renderer
registerRenderer("statusRenderer", statusRenderer);

const DetailRecap = () => {
  const {
    dataRecap,
    isLoadingRecap,
    monthName,
    currentyear,

    handleExport,
    isLoadingExport,

    dataClass,
    tableData,
    daysInMonth,
  } = useDetailRecap();

  if (isLoadingRecap) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Spinner color="default" />
      </div>
    );
  }

  if (!dataRecap) return <p>No data available</p>;

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">
          Rekap Presensi - {dataClass?.className} (Bulan {monthName},{" "}
          {currentyear})
        </h2>
        <Button
          className="bg-[#006d63] text-white"
          onPress={() => handleExport()}
        >
          {isLoadingExport ? <Spinner size="sm" color="white" /> : "Export"}
        </Button>
      </div>
      <div className="hot-container">
        <HotTable
          data={tableData}
          colHeaders={[
            "Name",
            ...Array.from({ length: daysInMonth }, (_, i) =>
              (i + 1).toString(),
            ),
          ]}
          rowHeaders={true}
          width="100%"
          height="auto"
          stretchH="all"
          licenseKey="non-commercial-and-evaluation"
          readOnly={true}
          columns={[
            {
              data: 0,
              readOnly: true,
              width: calculateNameColumnWidth(tableData),
            }, // kolom Name
            ...Array.from({ length: daysInMonth }, (_, i) => ({
              data: i + 1,
              readOnly: true, // juga read-only
            })),
          ]}
          cells={() => {
            return { renderer: "statusRenderer" }; // ✅ Apply custom renderer
          }}
        />
      </div>
    </section>
  );
};

export default DetailRecap;
