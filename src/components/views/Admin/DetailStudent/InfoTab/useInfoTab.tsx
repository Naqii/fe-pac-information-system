import { DELAY } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import classServices from "@/services/class.services";
import parentServices from "@/services/parent.service";
import pcServices from "@/services/pc.services";
import studentServices from "@/services/student.services";
import { IPACForm } from "@/types/PC";
import { toDateStandard } from "@/utils/date";
import { DateValue } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schemaUpdateInfo = Yup.object().shape({
  fullName: Yup.string()
    .max(30, "Name cannot exceed 30 characters")
    .required("Please input name"),
  noTlp: Yup.string()
    .matches(/^[\d+\-]+$/, "Phone number can only contain numbers, +, and -")
    .required("Please input phone number"),
  gender: Yup.string().required("Please input gender"),
  parentName: Yup.string().required("Please input parent name"),
  className: Yup.string().required("Please input student class"),
  pc: Yup.string().required("Please input PC from"),
  pac: Yup.string().required("Please input PAC from"),
  tanggalLahir: Yup.mixed<DateValue>()
    .required("Please select birthdate")
    .transform((value) => (value ? toDateStandard(value) : value)),
  region: Yup.string().required("Please select Region"),
  address: Yup.string().required("Please input address"),
});

const useInfoTab = () => {
  const debounce = useDebounce();
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

  const { data: dataClass } = useQuery({
    queryKey: ["Class"],
    queryFn: () => classServices.getClass(),
    enabled: router.isReady,
  });

  const { data: dataParent } = useQuery({
    queryKey: ["Parent"],
    queryFn: () => parentServices.getParents(),
    enabled: router.isReady,
  });

  const [selectedPC, setSelectedPC] = useState("");

  const { data: dataPC } = useQuery({
    queryKey: ["PC"],
    queryFn: () => pcServices.getPC(),
    enabled: router.isReady,
  });

  const dataPACFromPC = useMemo(() => {
    const pcsArray = dataPC?.data?.data ?? [];
    const selected = pcsArray.find((pc: IPACForm) => pc._id === selectedPC);
    return selected?.pacList ?? [];
  }, [dataPC, selectedPC]);

  const [searchRegency, setSearchRegency] = useState("");

  const { data: dataRegion } = useQuery({
    queryKey: ["Region", searchRegency],
    queryFn: () => studentServices.searchLocationByRegency(`${searchRegency}`),
    enabled: searchRegency !== "",
  });

  const handleSearchRegion = (region: string) => {
    debounce(() => setSearchRegency(region), DELAY);
  };

  return {
    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,

    handleSearchRegion,
    searchRegency,

    dataClass,
    dataParent,
    dataRegion,
    dataPC,
    dataPACFromPC,
    setSelectedPC,
  };
};

export default useInfoTab;
