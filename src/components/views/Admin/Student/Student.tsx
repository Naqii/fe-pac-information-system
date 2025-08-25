import { useRouter } from "next/router";
import useStudent from "./useStudent";
import { Key, ReactNode, useCallback, useEffect } from "react";
import Image from "next/image";
import DropDownAction from "@/components/commons/DropDownAction";
import { useDisclosure } from "@heroui/react";
import DataTable from "@/components/ui/DataTable";
import { COLUMN_LISTS_STUDENT } from "./Student.constant";
import useChangeUrl from "@/hooks/useChangeUrl";

const Student = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataStudent,
    isLoadingStudent,
    isRefetchingStudent,
    refetchStudent,
    selectedId,
    setSelectedId,
  } = useStudent();

  const addStudentModal = useDisclosure();
  const deleteStudentModal = useDisclosure();

  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
      refetchStudent();
      setSelectedId("");
    }
  }, [isReady]);

  const renderCell = useCallback(
    (student: Record<string, unknown>, columnKey: Key) => {
      const cellValue = student[columnKey as keyof typeof student];
      switch (columnKey) {
        case "picture":
          return (
            <Image
              src={`${cellValue}`}
              alt="picture"
              width={100}
              height={100}
              className="rounded-lg"
            />
          );
        case "actions":
          return (
            <DropDownAction
              onPressButtonDetail={() => push(`/admin/student/${student._id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${student._id}`);
                deleteStudentModal.onOpen();
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
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          columns={COLUMN_LISTS_STUDENT}
          emptyContent="Student is Empty"
          isLoading={isLoadingStudent || isRefetchingStudent}
          data={dataStudent?.data || []}
          onClickButtonTopContent={addStudentModal.onOpen}
          buttonTopContentLabel="Create Student"
          renderCell={renderCell}
          totalPages={dataStudent?.pagination.totalPages}
        />
      )}
    </section>
  );
};

export default Student;
