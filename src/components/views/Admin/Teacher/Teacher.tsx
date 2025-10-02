import { useRouter } from "next/router";
import useTeacher from "./useTeacher";
import { Key, ReactNode, useCallback, useEffect } from "react";
import Image from "next/image";
import DropDownAction from "@/components/commons/DropDownAction";
import DataTable from "@/components/ui/DataTable";
import { COLUMN_LISTS_TEACHER } from "./Teacher.constant";
import { useDisclosure } from "@heroui/react";
import DeleteTeacherModal from "./DeleteTeacherModal/DeleteTeacherModal";
import AddTeacherModal from "./AddTeacherModal/AddTeacherModal";

const Teacher = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataTeacher,
    isLoadingTeacher,
    isRefetchingTeacher,
    refetchTeachers,

    selectedId,
    setSelectedId,
  } = useTeacher();

  const addTeacherModal = useDisclosure();
  const deleteTeacherModal = useDisclosure();

  useEffect(() => {
    if (isReady) {
      if (!query.limit || !query.page) {
        push({
          pathname: `/admin/teacher/`,
          query: { limit: 8, page: 1, search: "" },
        });
      } else {
        refetchTeachers();
      }
      setSelectedId("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, query, refetchTeachers]);

  const renderCell = useCallback(
    (teacher: Record<string, unknown>, columnKey: Key) => {
      const cellValue = teacher[columnKey as keyof typeof teacher];
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
                priority
              />
            </div>
          );
        case "actions":
          return (
            <DropDownAction
              onPressButtonDetail={() => push(`/admin/teacher/${teacher._id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${teacher._id}`);
                deleteTeacherModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [push],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          columns={COLUMN_LISTS_TEACHER}
          emptyContent="Teacher is Empty"
          isLoading={isLoadingTeacher || isRefetchingTeacher}
          data={dataTeacher?.data}
          onClickButtonTopContent={addTeacherModal.onOpen}
          buttonTopContentLabel="Create Teacher"
          renderCell={renderCell}
          totalPages={dataTeacher?.pagination.totalPages}
        />
      )}
      <AddTeacherModal {...addTeacherModal} refetchTeachers={refetchTeachers} />
      <DeleteTeacherModal
        {...deleteTeacherModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchTeacher={refetchTeachers}
      />
    </section>
  );
};

export default Teacher;
