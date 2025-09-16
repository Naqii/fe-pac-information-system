import { ToasterContext } from "@/contexts/ToasterContext";
import learningServices from "@/services/learning.services";
import teacherService from "@/services/teacher.service";
import { ILearning } from "@/types/Learning";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schema = Yup.object().shape({
  learningName: Yup.string().required("Please input learning"),
  totalPage: Yup.number().required("Please input total page"),
  teacherId: Yup.string().required("Please input teacher name"),
  description: Yup.string().required("Please input description"),
});

const useAddLearningModal = () => {
  const router = useRouter();
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

  const addLearning = async (payload: ILearning) => {
    const res = await learningServices.addLearning(payload);
    return res;
  };

  const { data: dataTeacher } = useQuery({
    queryKey: ["Teacher"],
    queryFn: () => teacherService.getTeacher(),
    enabled: router.isReady,
  });

  const {
    mutate: mutateAddLearning,
    isPending: isPendingMutateAddLearning,
    isSuccess: isSuccessMutateAddLearning,
  } = useMutation({
    mutationFn: addLearning,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error?.message || "An unexpected error occurred",
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success add Learning",
      });
      reset();
    },
  });

  const handleAddLearning = (data: ILearning) => {
    const payload = {
      ...data,
    };
    mutateAddLearning(payload);
  };

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddLearning,
    isPendingMutateAddLearning,
    isSuccessMutateAddLearning,

    setValue,
    dataTeacher,
  };
};

export default useAddLearningModal;
