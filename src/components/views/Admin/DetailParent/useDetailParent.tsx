import { ToasterContext } from "@/contexts/ToasterContext";
import parentServices from "@/services/parent.service";
import studentServices from "@/services/student.services";
import { IParent, IParentForm } from "@/types/Parent";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailParent = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getParentById = async () => {
    const { data } = await parentServices.getParentById(`${query.id}`);
    return data.data;
  };

  const { data: dataParent, refetch: refetchParents } = useQuery({
    queryKey: ["Parent"],
    queryFn: getParentById,
    enabled: isReady,
  });

  const updateParent = async (payload: IParent) => {
    const { data } = await parentServices.updateParent(`${query.id}`, payload);
    return data.data;
  };

  const {
    mutate: mutateUpdateParent,
    isPending: isPendingMutateUpdateParent,
    isSuccess: isSuccessMutateUpdateParent,
  } = useMutation({
    mutationFn: (payload: IParent) => updateParent(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error?.message || "An error occured",
      });
    },
    onSuccess: () => {
      refetchParents();
      setToaster({
        type: "success",
        message: "Success update Parent",
      });
    },
  });

  const handleUpdateParent = (data: IParent) => mutateUpdateParent(data);

  const handleUpdateInfo = (data: IParentForm) => {
    const payload = {
      ...data,
      location: {
        region: `${data.region}`,
        address: `${data.address}`,
      },
    };
    mutateUpdateParent(payload);
  };

  const { data: dataDefaultRegion, isPending: isPendingDefaultRegion } =
    useQuery({
      queryKey: ["defaultRegion"],
      queryFn: () =>
        studentServices.getRegencyById(dataParent?.location?.region),
      enabled: !!dataParent?.location?.region,
    });

  return {
    dataParent,
    dataDefaultRegion,
    isPendingDefaultRegion,

    handleUpdateInfo,
    handleUpdateParent,

    isPendingMutateUpdateParent,
    isSuccessMutateUpdateParent,
  };
};

export default useDetailParent;
