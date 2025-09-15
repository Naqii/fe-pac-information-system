import { toDateStandard } from "@/utils/date";
import { DateValue } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schemaUpdateInfo = Yup.object().shape({
  teacherName: Yup.string().required("Please input teacher name"),
  startDate: Yup.mixed<DateValue>()
    .required("Please input start teaching")
    .transform((value) => (value ? toDateStandard(value) : value)),
  endDate: Yup.mixed<DateValue>().transform((value) =>
    value ? toDateStandard(value) : value,
  ),
  noTelp: Yup.string()
    .matches(/^[\d+\-]+$/, "Phone number can only contain numbers, +, and -")
    .required("Please input phone number"),
  bidang: Yup.string().required("Please input bidang"),
  gender: Yup.string().required("Please input gender"),
  pendidikan: Yup.string().required("Please input highest level of education"),
  slug: Yup.string().required("Please input slug"),
});

const useInfoTab = () => {
  const {
    control: controlUpdateInfo,
    handleSubmit: handleSubmitUpdateInfo,
    formState: { errors: errorsUpdateInfo },
    reset: resetUpdateInfo,
    setValue: setValueUpdateInfo,
  } = useForm({
    resolver: yupResolver(schemaUpdateInfo),
  });

  return {
    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  };
};

export default useInfoTab;
