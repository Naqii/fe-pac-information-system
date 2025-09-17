import useChangeUrl from "@/hooks/useChangeUrl";
import parentServices from "@/services/parent.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useParent = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getParent = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await parentServices.getParents(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataParent,
    isLoading: isLoadingParent,
    isRefetching: isRefetchingParent,
    refetch: refetchParents,
  } = useQuery({
    queryKey: ["Parent", currentPage, currentLimit, currentSearch],
    queryFn: () => getParent(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataParent,

    isLoadingParent,
    isRefetchingParent,
    refetchParents,

    selectedId,
    setSelectedId,
  };
};

export default useParent;
