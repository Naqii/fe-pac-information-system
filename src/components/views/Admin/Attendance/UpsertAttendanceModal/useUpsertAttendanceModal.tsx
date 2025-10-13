import { ToasterContext } from "@/contexts/ToasterContext";
import attendanceServices from "@/services/attendance.services";
import { IAttendanceForm } from "@/types/Attendance";
import { toDateStandard } from "@/utils/date";
import { DateValue } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schema = Yup.object().shape({
  date: Yup.mixed<DateValue>().required("Please select date"),
  status: Yup.string().required("Please input status"),
  description: Yup.string(),
});

const useUpsertAttendanceModal = (attendanceId: string) => {
  const { setToaster } = useContext(ToasterContext);
  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleOnClose = (onClose: () => void) => {
    reset();
    onClose();
  };

  const upsertAttendance = async (payload: IAttendanceForm) => {
    const { data } = await attendanceServices.upsertAttendance(
      attendanceId,
      payload,
    );
    return data.data;
  };

  const {
    mutate: mutateUpsertAttendance,
    isPending: isPendingMutateUpsertAttendance,
    isSuccess: isSuccessMutateUpsertAttendance,
  } = useMutation({
    mutationFn: (payload: IAttendanceForm) => upsertAttendance(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error?.message || "An unexpected error occurred",
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success add Student",
      });
      reset();
    },
  });

  const handleUpsertAttendance = (data: IAttendanceForm) => {
    const payload = {
      date: toDateStandard(data.date as DateValue),
      status: data.status,
    };
    mutateUpsertAttendance(payload);
  };

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleUpsertAttendance,
    isPendingMutateUpsertAttendance,
    isSuccessMutateUpsertAttendance,

    handleOnClose,
    setValue,
  };
};

export default useUpsertAttendanceModal;
