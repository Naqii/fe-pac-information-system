import { Tab, Tabs } from "@heroui/react";
import useDetailStudent from "./useDetailStudent";
import PictureTab from "./PictureTab";
import InfoTab from "./InfoTab";

const DetailStudent = () => {
  const {
    dataStudent,

    handleUpdateInfo,
    handleUpdateStudent,

    isPendingMutateUpdateStudent,
    isSuccessMutateUpdateStuent,
    dataDefaultRegion,
    isPendingDefaultRegion,
  } = useDetailStudent();

  return (
    <Tabs aria-label="Options">
      <Tab key="picture" title="picture">
        <PictureTab
          currnetPicture={dataStudent?.picture}
          onUpdate={handleUpdateStudent}
          isPendingUpdate={isPendingMutateUpdateStudent}
          isSuccessUpdate={isSuccessMutateUpdateStuent}
        />
      </Tab>
      <Tab key="info" title="Info">
        <InfoTab
          dataStudent={dataStudent}
          onUpdate={handleUpdateStudent}
          isPendingUpdate={isPendingMutateUpdateStudent}
          isSuccessUpdate={isSuccessMutateUpdateStuent}
          dataDefaultRegion={dataDefaultRegion?.data?.data[0]?.name}
          isPendingDefaultRegion={isPendingDefaultRegion}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailStudent;
