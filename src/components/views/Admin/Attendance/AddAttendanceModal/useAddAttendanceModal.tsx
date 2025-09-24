import { ToasterContext } from "@/contexts/ToasterContext";
import attendanceServices from "@/services/attendance.services";
import studentServices from "@/services/student.services";
import { IAttendance } from "@/types/Attendance";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schema = Yup.object().shape({
  fullName: Yup.string().required("Please input student name"),
});

const useAddAttendanceModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const router = useRouter();

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleOnClose = (onClose: () => void) => {
    reset();
    onClose();
  };

  const { data: dataStudent } = useQuery({
    queryKey: ["Student"],
    queryFn: () => studentServices.getStudent(),
    enabled: router.isReady,
  });

  const addAttendance = async (payload: IAttendance) => {
    const res = await attendanceServices.addAttendance(payload);
    return res;
  };

  const {
    mutate: mutateAddAttendance,
    isPending: isPendingMutateAddAttendance,
    isSuccess: isSuccessMutateAddAttendance,
  } = useMutation({
    mutationFn: addAttendance,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error?.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success add Attendance",
      });
      reset();
    },
  });

  const handleAddAttendance = (data: IAttendance) => {
    const payload = {
      ...data,
    };
    mutateAddAttendance(payload);
  };

  return {
    dataStudent,

    handleOnClose,

    control,
    errors,
    handleSubmitForm,
    handleAddAttendance,
    isPendingMutateAddAttendance,
    isSuccessMutateAddAttendance,
  };
};

export default useAddAttendanceModal;
