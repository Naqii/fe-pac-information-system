import { useEffect } from "react";
import useUpsertAttendanceModal from "./useUpsertAttendanceModal";
import { getLocalTimeZone, now } from "@internationalized/date";
import {
  Button,
  DatePicker,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import { Controller } from "react-hook-form";

interface PropType {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  selectedId: string;
}

const UpsertAttendanceModal = (props: PropType) => {
  const { isOpen, onClose, onOpenChange, selectedId } = props;
  const {
    control,
    errors,
    handleSubmitForm,
    handleUpsertAttendance,
    isPendingMutateUpsertAttendance,
    isSuccessMutateUpsertAttendance,

    handleOnClose,
    setValue,
  } = useUpsertAttendanceModal(selectedId);

  useEffect(() => {
    if (isSuccessMutateUpsertAttendance) onClose();
  }, [isSuccessMutateUpsertAttendance, onClose]);

  const disabledSubmit = isPendingMutateUpsertAttendance;

  useEffect(() => {
    setValue("date", now(getLocalTimeZone()));
  }, [onOpenChange, setValue]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmitForm(handleUpsertAttendance)}>
        <ModalContent className="m-4">
          <ModalHeader>Upsert Attendance</ModalHeader>
          <ModalBody>
            <div className="flex flex-col">
              <p className="mb-4 text-sm font-bold">Attendance</p>
              <div className="mb-2 flex flex-col gap-2">
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Tanggal Presensi"
                      variant="bordered"
                      hideTimeZone
                      showMonthAndYearPickers
                      granularity="day"
                      isInvalid={errors.date !== undefined}
                      errorMessage={errors.date?.message}
                    />
                  )}
                />
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Presensi"
                      variant="bordered"
                      isInvalid={errors.status !== undefined}
                      errorMessage={errors.status?.message}
                    >
                      <SelectItem key="hadir">Hadir</SelectItem>
                      <SelectItem key="izin">Izin</SelectItem>
                      <SelectItem key="absen">Tanpa Keterangan</SelectItem>
                    </Select>
                  )}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={() => handleOnClose(onClose)}
              disabled={disabledSubmit}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#006d63] text-white"
              type="submit"
              disabled={disabledSubmit}
            >
              {isPendingMutateUpsertAttendance ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Student"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default UpsertAttendanceModal;
