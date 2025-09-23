import useChangeUrl from "@/hooks/useChangeUrl";
import attendanceServices from "@/services/attendance.services";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useAttendance = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch, currentClass } =
    useChangeUrl();

  const getAttendance = async () => {
    let params = `className=${currentClass}&limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await attendanceServices.getAttendance(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataAttendance,
    isLoading: isLoadingAttendance,
    isRefetching: isRefetchingAttendance,
    refetch: refetchAttendances,
  } = useQuery({
    queryKey: ["Attendance", currentPage, currentLimit, currentSearch],
    queryFn: () => getAttendance(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataAttendance,
    isLoadingAttendance,
    isRefetchingAttendance,
    refetchAttendances,

    selectedId,
    setSelectedId,
  };
};

export default useAttendance;
