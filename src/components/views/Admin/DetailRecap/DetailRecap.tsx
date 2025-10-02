import { Button, Spinner } from "@heroui/react";
import useDetailRecap from "./useDetailRecap";

const DetailRecap = () => {
  const {
    dataRecap,
    isLoadingRecap,
    monthName,
    currentyear,

    handleExport,
    isLoadingExport,

    dataClass,
  } = useDetailRecap();

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
    </section>
  );
};

export default DetailRecap;
