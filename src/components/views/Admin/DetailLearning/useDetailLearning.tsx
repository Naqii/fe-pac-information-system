import { ToasterContext } from "@/contexts/ToasterContext";
import learningServices from "@/services/learning.services";
import { ILearning } from "@/types/Learning";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailLearning = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getLearningById = async () => {
    const { data } = await learningServices.getLearningById(`${query.id}`);
    return data.data;
  };

  const { data: dataLearning, refetch: refetchLearnings } = useQuery({
    queryKey: ["Learning"],
    queryFn: getLearningById,
    enabled: isReady,
  });

  const updateLearning = async (payload: ILearning) => {
    const { data } = await learningServices.updateLearning(
      `${query.id}`,
      payload,
    );
    return data.data;
  };

  const {
    mutate: mutateUpdateLearning,
    isPending: isPendingMutateUpdateLearning,
    isSuccess: isSuccessMutateUpdateLearning,
  } = useMutation({
    mutationFn: (payload: ILearning) => updateLearning(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error?.message || "An error occured",
      });
    },
    onSuccess: () => {
      refetchLearnings();
      setToaster({
        type: "success",
        message: "Success update Learning",
      });
    },
  });

  const handleUpdateLearning = (data: ILearning) => mutateUpdateLearning(data);

  const handleUpdateInfo = (data: ILearning) => {
    const payload = { ...data };
    mutateUpdateLearning(payload);
  };

  return {
    dataLearning,

    handleUpdateInfo,
    handleUpdateLearning,

    isPendingMutateUpdateLearning,
    isSuccessMutateUpdateLearning,
  };
};

export default useDetailLearning;
