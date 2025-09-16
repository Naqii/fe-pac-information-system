import { Tab, Tabs } from "@heroui/react";
import PictureTab from "./PictureTab";
import InfoTab from "./InfoTab";
import useDetailTeacher from "./useDetailTeacher";

const DetailTeacher = () => {
  const {
    dataTeacher,

    handleUpdateTeacher,

    isPendingMutateUpdateTeacher,
    isSuccessMutateUpdateTeacher,
  } = useDetailTeacher();

  return (
    <Tabs aria-label="Options">
      <Tab key="picture" title="picture">
        <PictureTab
          currnetPicture={dataTeacher?.picture}
          onUpdate={handleUpdateTeacher}
          isPendingUpdate={isPendingMutateUpdateTeacher}
          isSuccessUpdate={isSuccessMutateUpdateTeacher}
        />
      </Tab>
      <Tab key="info" title="Info">
        <InfoTab
          dataTeacher={dataTeacher}
          onUpdate={handleUpdateTeacher}
          isPendingUpdate={isPendingMutateUpdateTeacher}
          isSuccessUpdate={isSuccessMutateUpdateTeacher}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailTeacher;
