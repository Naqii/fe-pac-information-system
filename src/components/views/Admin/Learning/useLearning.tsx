import useChangeUrl from "@/hooks/useChangeUrl";
import learningServices from "@/services/learning.services";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useLearning = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getLearning = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await learningServices.getLearning(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataLearning,
    isLoading: isLoadingLearning,
    isRefetching: isRefetchingLearning,
    refetch: refetchLearnings,
  } = useQuery({
    queryKey: ["Learning", currentPage, currentLimit, currentSearch],
    queryFn: () => getLearning(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataLearning,

    isLoadingLearning,
    isRefetchingLearning,
    refetchLearnings,

    selectedId,
    setSelectedId,
  };
};

export default useLearning;
