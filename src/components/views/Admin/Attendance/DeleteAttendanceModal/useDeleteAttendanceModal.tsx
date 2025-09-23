import { ToasterContext } from "@/contexts/ToasterContext";
import attendanceServices from "@/services/attendance.services";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteAttendanceModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteAttendance = async (id: string) => {
    const res = await attendanceServices.deleteAttendance(id);

    return res;
  };

  const {
    mutate: mutateDeleteAttendance,
    isPending: isPendingMutateDeleteAttendance,
    isSuccess: isSuccessMutateDeleteAttendance,
  } = useMutation({
    mutationFn: deleteAttendance,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Attendance Deleted",
      });
    },
  });

  return {
    mutateDeleteAttendance,
    isPendingMutateDeleteAttendance,
    isSuccessMutateDeleteAttendance,
  };
};

export default useDeleteAttendanceModal;
