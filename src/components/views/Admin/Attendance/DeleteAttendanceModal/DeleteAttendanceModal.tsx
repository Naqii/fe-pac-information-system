import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteAttendanceModal from "./useDeleteAttendanceModal";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchAttendances: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteAttendanceModal = (props: PropTypes) => {
  const {
    isOpen,
    onOpenChange,
    onClose,
    refetchAttendances,
    selectedId,
    setSelectedId,
  } = props;

  const {
    mutateDeleteAttendance,
    isPendingMutateDeleteAttendance,
    isSuccessMutateDeleteAttendance,
  } = useDeleteAttendanceModal();

  useEffect(() => {
    if (isSuccessMutateDeleteAttendance) {
      onClose();
      refetchAttendances();
      setSelectedId("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessMutateDeleteAttendance, onClose, refetchAttendances]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Attendance</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure want to delete this attendance ?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedId("");
            }}
            disabled={isPendingMutateDeleteAttendance}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteAttendance}
            onPress={() => mutateDeleteAttendance(selectedId)}
          >
            {isPendingMutateDeleteAttendance ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Attendance"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteAttendanceModal;
