import { useMemo } from "react";
import useChangeUrl from "@/hooks/useChangeUrl";
import attendanceServices from "@/services/attendance.services";
import classServices from "@/services/class.services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { saveAs } from "file-saver";
import { IClass } from "@/types/Class";
import { MONTHS } from "@/utils/month";
import { RecapResponse } from "@/types/Attendance";

const useDetailRecap = () => {
  const router = useRouter();
  const { currentClass, currentmonth, currentyear } = useChangeUrl();
  const monthName = MONTHS[Number(currentmonth)] || currentmonth;

  const { data: dataClass } = useQuery({
    queryKey: ["Class"],
    queryFn: async () => {
      const res = await classServices.getClassById(currentClass);
      return res.data.data as IClass;
    },
    enabled: router.isReady && !!currentClass,
  });

  const getRecapAttendance = async (): Promise<RecapResponse> => {
    const params = `className=${currentClass}&month=${currentmonth}&year=${currentyear}`;
    const res = await attendanceServices.getRecap(params);
    return res.data.data as RecapResponse;
  };

  const {
    data: dataRecap,
    isLoading: isLoadingRecap,
    refetch: refetchRecap,
  } = useQuery({
    queryKey: ["Recap", currentClass, currentmonth, currentyear],
    queryFn: getRecapAttendance,
    enabled: router.isReady,
  });

  const { mutate: handleExport, isPending: isLoadingExport } = useMutation({
    mutationFn: async () => {
      const params = `className=${currentClass}&month=${currentmonth}&year=${currentyear}`;
      const res = await attendanceServices.getExport(params);
      const namaKelas = dataClass?.className;
      saveAs(
        new Blob([res.data], { type: res.headers["content-type"] }),
        `Rekap-${namaKelas}-${monthName}-${currentyear}.xlsx`,
      );
    },
  });

  // ✅ Generate data untuk tabel
  const tableData = useMemo<(string | number)[][]>(() => {
    if (!dataRecap) return [];

    const { daysInMonth, attendance } = dataRecap;

    // baris utama (status)
    const rows = attendance.map((student) => {
      const row: (string | number)[] = [student.name];
      for (let day = 1; day <= daysInMonth; day++) {
        const cell = student.dates[String(day)];
        row.push(cell ? cell.status : "");
      }
      return row;
    });

    return [...rows];
  }, [dataRecap]);

  const daysInMonth = dataRecap?.daysInMonth ?? 0;

  return {
    dataRecap,
    isLoadingRecap,
    refetchRecap,
    monthName,
    currentyear,
    handleExport,
    isLoadingExport,
    dataClass,
    tableData,
    daysInMonth,
  };
};

export default useDetailRecap;
