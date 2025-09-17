import { ToasterContext } from "@/contexts/ToasterContext";
import parentServices from "@/services/parent.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteParentModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteParent = async (id: string) => {
    const res = await parentServices.deleteParent(id);

    return res;
  };

  const {
    mutate: mutateDeleteParent,
    isPending: isPendingMutateDeleteParent,
    isSuccess: isSuccessMutateDeleteParent,
  } = useMutation({
    mutationFn: deleteParent,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Parent Deleted",
      });
    },
  });

  return {
    mutateDeleteParent,
    isPendingMutateDeleteParent,
    isSuccessMutateDeleteParent,
  };
};

export default useDeleteParentModal;
