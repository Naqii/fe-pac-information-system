import { useRouter } from "next/router";
import useStudent from "./useStudent";
import { Key, ReactNode, useCallback, useEffect } from "react";
import Image from "next/image";
import DropDownAction from "@/components/commons/DropDownAction";
import DataTableStudent from "@/components/ui/DataTableStudent";
import { COLUMN_LISTS_STUDENT } from "./Student.constant";
import useChangeUrl from "@/hooks/useChangeUrl";
import { useDisclosure } from "@heroui/react";
import AddStudentModal from "./AddStudentModal";
import DeleteStudentModal from "./DeleteStudentModal";

const Student = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataStudent,
    isLoadingStudent,
    isRefetchingStudent,
    refetchStudents,
    selectedId,
    setSelectedId,
  } = useStudent();

  const addStudentModal = useDisclosure();
  const deleteStudentModal = useDisclosure();
  const { currentClass } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      if (!query.limit || !query.page) {
        push({
          pathname: "/admin/student",
          query: { limit: 8, page: 1, search: "" },
        });
      } else {
        refetchStudents();
      }
      setSelectedId("");
    }
  }, [isReady, query]);

  const renderCell = useCallback(
    (student: Record<string, unknown>, columnKey: Key) => {
      const cellValue = student[columnKey as keyof typeof student];
      switch (columnKey) {
        case "picture":
          return (
            <div className="h-16 w-16 overflow-hidden rounded-full sm:h-20 sm:w-20 md:h-24 md:w-24">
              <Image
                src={`${cellValue}`}
                alt="picture"
                width={100}
                height={100}
                className="object-cover"
              />
            </div>
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
    <section className="overflow-x-auto">
      {Object.keys(query).length > 0 && (
        <DataTableStudent
          tabsContent={currentClass}
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
      <AddStudentModal {...addStudentModal} refetchStudents={refetchStudents} />
      <DeleteStudentModal
        {...deleteStudentModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchStudent={refetchStudents}
      />
    </section>
  );
};

export default Student;
