import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import teacherService from "@/services/teacher.service";
import { ITeacher } from "@/types/Teacher";
import { toDateStandard } from "@/utils/date";
import { DateValue } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schema = Yup.object().shape({
  teacherName: Yup.string().required("Please input teacher name"),
  picture: Yup.mixed<FileList | string>().required("Please input picture"),
  startDate: Yup.mixed<DateValue>().required("Please input start teaching"),
  endDate: Yup.mixed<DateValue>(),
  noTelp: Yup.string()
    .matches(/^[\d+\-]+$/, "Phone number can only contain numbers, +, and -")
    .required("Please input phone number"),
  bidang: Yup.string().required("Please input bidang"),
  gender: Yup.string().required("Please input gender"),
  pendidikan: Yup.string().required("Please input highest level of education"),
  slug: Yup.string().required("Please input slug"),
});

const useAddTeacherModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const {
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,

    handleUploadFile,
    handleDeleteFile,
  } = useMediaHandling();

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const preview = watch("picture");
  const fileUrl = getValues("picture");

  const handleUploadPicture = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("picture", fileUrl);
      }
    });
  };

  const handleDeletePicture = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    const fileUrl = getValues("picture");
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  const handleOnClose = (onClose: () => void) => {
    handleDeleteFile(fileUrl, () => {
      reset();
      onClose();
    });
  };

  const addTeacher = async (payload: ITeacher) => {
    const res = await teacherService.addTeacher(payload);
    return res;
  };

  const {
    mutate: mutateAddTeacher,
    isPending: isPendingMutateAddTeacher,
    isSuccess: isSuccessMutateAddTeacher,
  } = useMutation({
    mutationFn: addTeacher,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error?.message || "An unexpected error occurred",
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success add Teacher",
      });
      reset();
    },
  });

  const handleAddTeacher = (data: ITeacher) => {
    const payload = {
      ...data,
      startDate: toDateStandard(data.startDate as DateValue),
      picture: data.picture,
    };
    mutateAddTeacher(payload);
  };

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddTeacher,
    isPendingMutateAddTeacher,
    isSuccessMutateAddTeacher,

    preview,
    handleUploadPicture,
    isPendingMutateUploadFile,
    handleDeletePicture,
    isPendingMutateDeleteFile,
    handleOnClose,
    setValue,
  };
};

export default useAddTeacherModal;
