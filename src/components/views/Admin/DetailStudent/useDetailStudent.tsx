import { ToasterContext } from "@/contexts/ToasterContext";
import studentServices from "@/services/student.services";
import { IStudent, IStudentForm } from "@/types/Student";
import { toDateStandard } from "@/utils/date";
import { DateValue } from "@heroui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailStudent = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getStudentById = async () => {
    const { data } = await studentServices.getStudentById(`${query.id}`);
    return data.data;
  };

  const { data: dataStudent, refetch: refetchStudents } = useQuery({
    queryKey: ["Student"],
    queryFn: getStudentById,
    enabled: isReady,
  });

  const updateStudent = async (payload: IStudent) => {
    const { data } = await studentServices.updateStudent(
      `${query.id}`,
      payload,
    );
    return data.data;
  };

  const {
    mutate: mutateUpdateStudent,
    isPending: isPendingMutateUpdateStudent,
    isSuccess: isSuccessMutateUpdateStuent,
  } = useMutation({
    mutationFn: (payload: IStudent) => updateStudent(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error?.message || "An error occured",
      });
    },
    onSuccess: () => {
      refetchStudents();
      setToaster({
        type: "success",
        message: "Success update student",
      });
    },
  });

  const handleUpdateStudent = (data: IStudent) => mutateUpdateStudent(data);

  const handleUpdateInfo = (data: IStudentForm) => {
    const payload = {
      ...data,
      tanggalLahir: toDateStandard(data.tanggalLahir as DateValue),
      location: {
        region: `${data.region}`,
        address: `${data.address}`,
      },
    };
    mutateUpdateStudent(payload);
  };

  const { data: dataDefaultRegion, isPending: isPendingDefaultRegion } =
    useQuery({
      queryKey: ["defaultRegion"],
      queryFn: () =>
        studentServices.getRegencyById(dataStudent?.location?.region),
      enabled: !!dataStudent?.location?.region,
    });

  return {
    dataStudent,

    handleUpdateInfo,
    handleUpdateStudent,

    isPendingMutateUpdateStudent,
    isSuccessMutateUpdateStuent,
    dataDefaultRegion,
    isPendingDefaultRegion,
  };
};

export default useDetailStudent;
