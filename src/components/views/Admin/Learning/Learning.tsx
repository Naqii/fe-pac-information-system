/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import useLearning from "./useLearning";
import { useDisclosure } from "@heroui/react";
import { Key, ReactNode, useCallback, useEffect } from "react";
import DropDownAction from "@/components/commons/DropDownAction";
import DataTable from "@/components/ui/DataTable";
import { COLUMN_LISTS_LEARNING } from "./Learning.constant";
import DeleteLearningModal from "./DeleteLearningModal";
import AddLearningModal from "./AddLearningModal/AddLearningModal";
import useChangeUrl from "@/hooks/useChangeUrl";

const Learning = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataLearning,

    isLoadingLearning,
    isRefetchingLearning,
    refetchLearnings,

    selectedId,
    setSelectedId,
  } = useLearning();

  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const addLearningModal = useDisclosure();
  const deleteLearningModal = useDisclosure();

  const renderCell = useCallback(
    (learning: Record<string, unknown>, columnKey: Key) => {
      const cellValue = learning[columnKey as keyof typeof learning];
      switch (columnKey) {
        case "actions":
          return (
            <DropDownAction
              onPressButtonDetail={() =>
                push(`/admin/learning/${learning._id}`)
              }
              onPressButtonDelete={() => {
                setSelectedId(`${learning._id}`);
                deleteLearningModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section className="overflow-x-auto">
      {Object.keys(query).length > 0 && (
        <DataTable
          columns={COLUMN_LISTS_LEARNING}
          emptyContent="Learning is Empty"
          isLoading={isLoadingLearning || isRefetchingLearning}
          data={dataLearning?.data || []}
          onClickButtonTopContent={addLearningModal.onOpen}
          buttonTopContentLabel="Create Learning"
          renderCell={renderCell}
          totalPages={dataLearning?.pagination.totalPages}
        />
      )}
      <AddLearningModal
        {...addLearningModal}
        refetchLearnings={refetchLearnings}
      />
      <DeleteLearningModal
        {...deleteLearningModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchLearning={refetchLearnings}
      />
    </section>
  );
};

export default Learning;
