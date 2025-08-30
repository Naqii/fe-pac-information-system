import { ToasterContext } from "@/contexts/ToasterContext";
import studentServices from "@/services/student.services";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteStudentModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteStudent = async (id: string) => {
    const res = await studentServices.deleteStudent(id);

    return res;
  };

  const {
    mutate: mutateDeleteStudent,
    isPending: isPendingMutateDeleteStudent,
    isSuccess: isSuccessMutateDeleteStudent,
  } = useMutation({
    mutationFn: deleteStudent,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Student Deleted",
      });
    },
  });

  return {
    mutateDeleteStudent,
    isPendingMutateDeleteStudent,
    isSuccessMutateDeleteStudent,
  };
};

export default useDeleteStudentModal;
