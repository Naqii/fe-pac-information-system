import useChangeUrl from "@/hooks/useChangeUrl";
import studentServices from "@/services/student.services";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useStudent = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getStudent = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await studentServices.getStudent(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataStudent,
    isLoading: isLoadingStudent,
    isRefetching: isRefetchingStudent,
    refetch: refetchStudent,
  } = useQuery({
    queryKey: ["Student", currentPage, currentLimit, currentSearch],
    queryFn: () => getStudent(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataStudent,
    isLoadingStudent,
    isRefetchingStudent,
    refetchStudent,

    selectedId,
    setSelectedId,
  };
};

export default useStudent;
