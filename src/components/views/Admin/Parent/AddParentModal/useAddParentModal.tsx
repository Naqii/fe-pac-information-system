import { DELAY } from "@/constants/list.constants";
import { ToasterContext } from "@/contexts/ToasterContext";
import useDebounce from "@/hooks/useDebounce";
import parentServices from "@/services/parent.service";
import studentServices from "@/services/student.services";
import { IParent } from "@/types/Parent";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schema = Yup.object().shape({
  parentName: Yup.string().required("Please input parent"),
  noTlp: Yup.string()
    .matches(/^[\d+\-]+$/, "Phone number can only contain numbers, +, and -")
    .required("Please input phone number"),
  gender: Yup.string().required("Please input gender"),
  poss: Yup.string().required("Please input teacher name"),
  region: Yup.string().required("Please select Region"),
  address: Yup.string().required("Please input address"),
});

const useAddParentModal = () => {
  const debounce = useDebounce();
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

  const [searchRegency, setSearchRegency] = useState("");

  const { data: dataRegion } = useQuery({
    queryKey: ["Region", searchRegency],
    queryFn: () => studentServices.searchLocationByRegency(`${searchRegency}`),
    enabled: searchRegency !== "",
  });

  const handleSearchRegion = (region: string) => {
    debounce(() => setSearchRegency(region), DELAY);
  };

  const addParent = async (payload: IParent) => {
    const res = await parentServices.addParent(payload);
    return res;
  };

  const {
    mutate: mutateAddParent,
    isPending: isPendingMutateAddParent,
    isSuccess: isSuccessMutateAddParent,
  } = useMutation({
    mutationFn: addParent,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error?.message || "An unexpected error occurred",
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success add Parent",
      });
      reset();
    },
  });

  const handleAddParent = (data: IParent) => {
    const payload = {
      ...data,
    };
    mutateAddParent(payload);
  };

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddParent,
    isPendingMutateAddParent,
    isSuccessMutateAddParent,

    dataRegion,
    handleSearchRegion,
    searchRegency,
    setValue,
  };
};

export default useAddParentModal;
