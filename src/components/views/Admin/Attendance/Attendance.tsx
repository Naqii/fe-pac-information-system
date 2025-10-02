import { useRouter } from "next/router";
import useAttendance from "./useAttendance";
import { Tooltip, useDisclosure } from "@heroui/react";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Key, useCallback, useEffect } from "react";
import { COLUMN_LISTS_ATTENDANCE } from "./Attendance.constant";
import { MdDelete, MdEditSquare } from "react-icons/md";
import DeleteAttendanceModal from "./DeleteAttendanceModal";
import AddAttendanceModal from "./AddAttendanceModal";
import DataTableAttendance from "@/components/ui/DataTableAttendance/DataTableAttendance";
import UpsertAttendanceModal from "./UpsertAttendanceModal";

const Attendance = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataAttendance,
    isLoadingAttendance,
    isRefetchingAttendance,
    refetchAttendances,

    selectedId,
    setSelectedId,
  } = useAttendance();

  const addAttendanceModal = useDisclosure();
  const deleteAttendanceModal = useDisclosure();
  const upsertAttendanceModal = useDisclosure();
  const { currentClass } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      if (!query.limit || !query.page) {
        push({
          pathname: `/admin/attendance/`,
          query: { limit: 8, page: 1, search: "" },
        });
      } else {
        refetchAttendances();
      }
      setSelectedId("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, query, refetchAttendances]);

  const renderCell = useCallback(
    (attendance: Record<string, unknown>, columnKey: Key) => {
      const cellValue = attendance[columnKey as keyof typeof attendance];
      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex items-center gap-3">
              <Tooltip content="Edit user">
                <span className="cursor-pointer rounded bg-[#006d63] text-lg active:opacity-50">
                  <MdEditSquare
                    className="text-white"
                    onClick={() => {
                      setSelectedId(`${attendance._id}`);
                      upsertAttendanceModal.onOpen();
                    }}
                  />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <span className="text-danger cursor-pointer text-lg active:opacity-50">
                  <MdDelete
                    onClick={() => {
                      setSelectedId(`${attendance._id}`);
                      deleteAttendanceModal.onOpen();
                    }}
                  />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue as React.ReactNode;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [push],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTableAttendance
          tabsContent={currentClass}
          columns={COLUMN_LISTS_ATTENDANCE}
          emptyContent="Attendance is Empty"
          isLoading={isLoadingAttendance || isRefetchingAttendance}
          data={dataAttendance?.data || []}
          onClickButtonTopContent={addAttendanceModal.onOpen}
          buttonTopContentLabel="Add Attendance"
          renderCell={renderCell}
          totalPages={dataAttendance?.pagination.totalPages}
        />
      )}
      <AddAttendanceModal
        {...addAttendanceModal}
        refetchAttendances={refetchAttendances}
      />
      <UpsertAttendanceModal
        {...upsertAttendanceModal}
        selectedId={selectedId}
      />
      <DeleteAttendanceModal
        {...deleteAttendanceModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchAttendances={refetchAttendances}
      />
    </section>
  );
};

export default Attendance;
