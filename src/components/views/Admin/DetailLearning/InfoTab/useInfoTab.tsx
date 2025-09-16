import teacherService from "@/services/teacher.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schemaUpdateInfo = Yup.object().shape({
  learningName: Yup.string().required("Please input learning"),
  totalPage: Yup.number().required("Please input total page"),
  teacherId: Yup.string().required("Please input teacher name"),
  description: Yup.string().required("Please input description"),
});

const useInfoTab = () => {
  const router = useRouter();
  const {
    control: controlUpdateInfo,
    handleSubmit: handleSubmitUpdateInfo,
    formState: { errors: errorsUpdateInfo },
    reset: resetUpdateInfo,
    setValue: setValueUpdateInfo,
  } = useForm({
    resolver: yupResolver(schemaUpdateInfo),
  });

  const { data: dataTeacher } = useQuery({
    queryKey: ["Parent"],
    queryFn: () => teacherService.getTeacher(),
    enabled: router.isReady,
  });

  return {
    dataTeacher,

    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  };
};

export default useInfoTab;
