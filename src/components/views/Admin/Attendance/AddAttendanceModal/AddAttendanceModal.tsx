import { useEffect } from "react";
import useAddAttendanceModal from "./useAddAttendanceModal";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { IStudent } from "@/types/Student";

interface PropType {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchAttendances: () => void;
}

const AddAttendanceModal = (props: PropType) => {
  const { isOpen, onClose, onOpenChange, refetchAttendances } = props;
  const {
    dataStudent,

    handleOnClose,

    control,
    errors,
    handleSubmitForm,
    handleAddAttendance,
    isPendingMutateAddAttendance,
    isSuccessMutateAddAttendance,
  } = useAddAttendanceModal();

  useEffect(() => {
    if (isSuccessMutateAddAttendance) {
      onClose();
      refetchAttendances();
    }
  }, [isSuccessMutateAddAttendance, onClose, refetchAttendances]);

  const disabledSubmit = isPendingMutateAddAttendance;

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmitForm(handleAddAttendance)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Attendance</ModalHeader>
          <ModalBody>
            <div className="flex flex-col">
              <p className="mb-4 text-sm font-bold">Information</p>
              <div className="mb-2 flex flex-col gap-2">
                <Controller
                  name="fullName"
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <Autocomplete
                      {...field}
                      defaultItems={dataStudent?.data.data || []}
                      label="Student"
                      variant="bordered"
                      isInvalid={errors.fullName !== undefined}
                      errorMessage={errors.fullName?.message}
                      onSelectionChange={(value) => onChange(value)}
                      placeholder="Search Student Here"
                    >
                      {(student: IStudent) => (
                        <AutocompleteItem key={`${student._id}`}>
                          {student.fullName}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
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
              {isPendingMutateAddAttendance ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Attendance"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddAttendanceModal;
