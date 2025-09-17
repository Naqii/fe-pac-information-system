import { Tab, Tabs } from "@heroui/react";
import InfoTab from "./InfoTab";
import useDetailParent from "./useDetailParent";

const DetailParent = () => {
  const {
    dataParent,

    handleUpdateParent,

    isPendingMutateUpdateParent,
    isSuccessMutateUpdateParent,

    dataDefaultRegion,
    isPendingDefaultRegion,
  } = useDetailParent();

  return (
    <Tabs aria-label="Options">
      <Tab key="info" title="Info">
        <InfoTab
          dataParent={dataParent}
          onUpdate={handleUpdateParent}
          isPendingUpdate={isPendingMutateUpdateParent}
          isSuccessUpdate={isSuccessMutateUpdateParent}
          dataDefaultRegion={dataDefaultRegion?.data?.data[0]?.name}
          isPendingDefaultRegion={isPendingDefaultRegion}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailParent;
