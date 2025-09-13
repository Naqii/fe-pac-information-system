import { ToasterContext } from "@/contexts/ToasterContext";
import teacherService from "@/services/teacher.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteTeacherModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteTeacher = async (id: string) => {
    const res = await teacherService.deleteTeacher(id);
    return res;
  };

  const {
    mutate: mutateDeleteTeacher,
    isPending: isPendingMutateDeleteTeacher,
    isSuccess: isSuccessMutateDeleteTeacher,
  } = useMutation({
    mutationFn: deleteTeacher,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Teacher Deleted",
      });
    },
  });

  return {
    mutateDeleteTeacher,

    isPendingMutateDeleteTeacher,
    isSuccessMutateDeleteTeacher,
  };
};

export default useDeleteTeacherModal;
