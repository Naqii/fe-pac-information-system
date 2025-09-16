import { ToasterContext } from "@/contexts/ToasterContext";
import learningServices from "@/services/learning.services";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteLearningModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteLearning = async (id: string) => {
    const res = await learningServices.deleteLearning(id);

    return res;
  };

  const {
    mutate: mutateDeleteLearning,
    isPending: isPendingMutateDeleteLearning,
    isSuccess: isSuccessMutateDeleteLearning,
  } = useMutation({
    mutationFn: deleteLearning,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Learning Deleted",
      });
    },
  });

  return {
    mutateDeleteLearning,
    isPendingMutateDeleteLearning,
    isSuccessMutateDeleteLearning,
  };
};

export default useDeleteLearningModal;
