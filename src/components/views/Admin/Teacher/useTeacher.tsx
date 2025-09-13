import useChangeUrl from "@/hooks/useChangeUrl";
import teacherService from "@/services/teacher.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useTeacher = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getTeacher = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) params += `$search=${currentSearch}`;
    const res = await teacherService.getTeacher(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataTeacher,
    isLoading: isLoadingTeacher,
    isRefetching: isRefetchingTeacher,
    refetch: refetchTeachers,
  } = useQuery({
    queryKey: ["Teacher", currentPage, currentLimit, currentSearch],
    queryFn: () => getTeacher(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataTeacher,
    isLoadingTeacher,
    isRefetchingTeacher,
    refetchTeachers,

    selectedId,
    setSelectedId,
  };
};

export default useTeacher;
