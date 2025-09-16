import { Tab, Tabs } from "@heroui/react";
import InfoTab from "./InfoTab";
import useDetailLearning from "./useDetailLearning";

const DetailLearning = () => {
  const {
    dataLearning,

    handleUpdateLearning,

    isPendingMutateUpdateLearning,
    isSuccessMutateUpdateLearning,
  } = useDetailLearning();

  return (
    <Tabs aria-label="Options">
      <Tab key="info" title="Info">
        <InfoTab
          dataLearning={dataLearning}
          onUpdate={handleUpdateLearning}
          isPendingUpdate={isPendingMutateUpdateLearning}
          isSuccessUpdate={isSuccessMutateUpdateLearning}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailLearning;
