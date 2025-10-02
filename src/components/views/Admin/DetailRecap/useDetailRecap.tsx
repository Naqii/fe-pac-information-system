import useChangeUrl from "@/hooks/useChangeUrl";
import attendanceServices from "@/services/attendance.services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { saveAs } from "file-saver";
import classServices from "@/services/class.services";
import { IClass } from "@/types/Class";
import { MONTHS } from "@/utils/month";

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

  const getRecapAttendance = async () => {
    const params = `className=${currentClass}&month=${currentmonth}&year=${currentyear}`;
    const res = await attendanceServices.getRecap(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataRecap,
    isLoading: isLoadingRecap,
    isRefetching: isRefetchingRecap,
    refetch: refetchRecap,
  } = useQuery({
    queryKey: ["Recap", currentClass, currentmonth, currentyear],
    queryFn: () => getRecapAttendance(),
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

  return {
    dataRecap,
    isLoadingRecap,
    isRefetchingRecap,
    refetchRecap,
    monthName,
    currentyear,

    handleExport,
    isLoadingExport,

    dataClass,
  };
};

export default useDetailRecap;
