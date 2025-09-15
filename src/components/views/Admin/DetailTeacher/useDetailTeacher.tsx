import { ToasterContext } from "@/contexts/ToasterContext";
import teacherService from "@/services/teacher.service";
import { ITeacher } from "@/types/Teacher";
import { toDateStandard } from "@/utils/date";
import { DateValue } from "@heroui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailTeacher = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getTeacherById = async () => {
    const { data } = await teacherService.getTeacherById(`${query.id}`);
    return data.data;
  };

  const { data: dataTeacher, refetch: refetchTeachers } = useQuery({
    queryKey: ["Teacher"],
    queryFn: getTeacherById,
    enabled: isReady,
  });

  const updateTeacher = async (payload: ITeacher) => {
    const { data } = await teacherService.updateTeacher(`${query.id}`, payload);
    return data.data;
  };

  const {
    mutate: mutateUpdateTeacher,
    isPending: isPendingMutateUpdateTeacher,
    isSuccess: isSuccessMutateUpdateTeacher,
  } = useMutation({
    mutationFn: (payload: ITeacher) => updateTeacher(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error?.message || "An error occured",
      });
    },
    onSuccess: () => {
      refetchTeachers();
      setToaster({
        type: "success",
        message: "Success update Teacher",
      });
    },
  });

  const handleUpdateTeacher = (data: ITeacher) => mutateUpdateTeacher(data);

  const handleUpdateInfo = (data: ITeacher) => {
    const payload = {
      ...data,
      startDate: toDateStandard(data.startDate as DateValue),
      endDate: toDateStandard(data.endDate as DateValue),
    };
    mutateUpdateTeacher(payload);
  };

  return {
    dataTeacher,

    handleUpdateInfo,
    handleUpdateTeacher,

    isPendingMutateUpdateTeacher,
    isSuccessMutateUpdateTeacher,
  };
};

export default useDetailTeacher;
