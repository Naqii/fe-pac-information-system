/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useDisclosure } from "@heroui/react";
import { Key, ReactNode, useCallback, useEffect } from "react";
import DropDownAction from "@/components/commons/DropDownAction";
import DataTable from "@/components/ui/DataTable";
import { COLUMN_LISTS_PARENT } from "./Parent.constant";
import DeleteParentModal from "./DeleteParentModal";
import useChangeUrl from "@/hooks/useChangeUrl";
import useParent from "./useParent";
import AddParentModal from "./AddParentModal/AddParentModal";

const Parent = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataParent,
    isLoadingParent,
    isRefetchingParent,
    refetchParents,

    selectedId,
    setSelectedId,
  } = useParent();

  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const addParentModal = useDisclosure();
  const deleteParentModal = useDisclosure();

  const renderCell = useCallback(
    (parent: Record<string, unknown>, columnKey: Key) => {
      const cellValue = parent[columnKey as keyof typeof parent];
      switch (columnKey) {
        case "actions":
          return (
            <DropDownAction
              onPressButtonDetail={() => push(`/admin/parent/${parent._id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${parent._id}`);
                deleteParentModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push, deleteParentModal, setSelectedId],
  );

  return (
    <section className="overflow-x-auto">
      {Object.keys(query).length > 0 && (
        <DataTable
          columns={COLUMN_LISTS_PARENT}
          emptyContent="Parent is Empty"
          isLoading={isLoadingParent || isRefetchingParent}
          data={dataParent?.data || []}
          onClickButtonTopContent={addParentModal.onOpen}
          buttonTopContentLabel="Create Parent"
          renderCell={renderCell}
          totalPages={dataParent?.pagination.totalPages}
        />
      )}
      <AddParentModal {...addParentModal} refetchParents={refetchParents} />
      <DeleteParentModal
        {...deleteParentModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchParent={refetchParents}
      />
    </section>
  );
};

export default Parent;
