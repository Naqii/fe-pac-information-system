import { DELAY } from "@/constants/list.constants";
import { ToasterContext } from "@/contexts/ToasterContext";
import useDebounce from "@/hooks/useDebounce";
import useMediaHandling from "@/hooks/useMediaHandling";
import classServices from "@/services/class.services";
import parentServices from "@/services/parent.service";
import studentServices from "@/services/student.services";
import { IStudent, IStudentForm } from "@/types/Student";
import { toDateStandard } from "@/utils/date";
import { DateValue } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schema = Yup.object().shape({
  fullName: Yup.string().required("Please input student name"),
  picture: Yup.mixed<FileList | string>().required("Please input picture"),
  noTlp: Yup.string().required("Please input phone number"),
  gender: Yup.string().required("Please input gender"),
  parentName: Yup.string().required("Please input parent name"),
  className: Yup.string().required("Please input student class"),
  startDate: Yup.mixed<DateValue>().required("Please select birthdate"),
  region: Yup.string().required("Please select Region"),
  address: Yup.string().required("Please input address"),
});

const useAddStudentModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const router = useRouter();
  const debounce = useDebounce();
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

  const { data: dataParent } = useQuery({
    queryKey: ["Parent"],
    queryFn: () => parentServices.getParents(),
    enabled: router.isReady,
  });

  const { data: dataClass } = useQuery({
    queryKey: ["Class"],
    queryFn: () => classServices.getClass(),
    enabled: router.isReady,
  });

  const [searchRegency, setSearchRegency] = useState("");

  const { data: dataRegion } = useQuery({
    queryKey: ["Region", searchRegency],
    queryFn: () => studentServices.searchLocationByRegency(`${searchRegency}`),
    enabled: searchRegency !== "",
  });

  console.log(searchRegency);

  const handleSearchRegion = (region: string) => {
    debounce(() => setSearchRegency(region), DELAY);
  };

  const addStudent = async (payload: IStudent) => {
    const res = await studentServices.addEvent(payload);
    return res;
  };

  const {
    mutate: mutateAddStudent,
    isPending: isPendingMutateAddStudent,
    isSuccess: isSuccessMutateAddStudent,
  } = useMutation({
    mutationFn: addStudent,
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

  const handleAddStudent = (data: IStudentForm) => {
    const payload = {
      ...data,
      startDate: toDateStandard(data.startDate as DateValue),
      location: {
        address: `${data.address}`,
        region: `${data.region}`,
      },
      picture: data.picture,
    };
    mutateAddStudent(payload);
  };

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddStudent,
    isPendingMutateAddStudent,
    isSuccessMutateAddStudent,

    preview,
    handleUploadPicture,
    isPendingMutateUploadFile,
    handleDeletePicture,
    isPendingMutateDeleteFile,
    handleOnClose,
    setValue,

    dataClass,
    dataParent,
    dataRegion,
    searchRegency,
    handleSearchRegion,
  };
};

export default useAddStudentModal;
