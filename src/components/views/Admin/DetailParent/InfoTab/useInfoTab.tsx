import { DELAY } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import studentServices from "@/services/student.services";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schemaUpdateInfo = Yup.object().shape({
  parentName: Yup.string().required("Please input parent"),
  noTlp: Yup.string()
    .matches(/^[\d+\-]+$/, "Phone number can only contain numbers, +, and -")
    .required("Please input phone number"),
  gender: Yup.string().required("Please input gender"),
  poss: Yup.string().required("Please input teacher name"),
  region: Yup.string().required("Please select Region"),
  address: Yup.string().required("Please input address"),
});

const useInfoTab = () => {
  const debounce = useDebounce();
  const {
    control: controlUpdateInfo,
    handleSubmit: handleSubmitUpdateInfo,
    formState: { errors: errorsUpdateInfo },
    reset: resetUpdateInfo,
    setValue: setValueUpdateInfo,
  } = useForm({
    resolver: yupResolver(schemaUpdateInfo),
  });

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
    dataRegion,
  };
};

export default useInfoTab;
