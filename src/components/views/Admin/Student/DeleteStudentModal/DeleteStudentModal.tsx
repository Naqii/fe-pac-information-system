import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteStudentModal from "./useDeleteStudentModal";
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
  refetchStudent: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteStudentModal = (props: PropTypes) => {
  const {
    isOpen,
    onOpenChange,
    onClose,
    refetchStudent,
    selectedId,
    setSelectedId,
  } = props;

  const {
    mutateDeleteStudent,
    isPendingMutateDeleteStudent,
    isSuccessMutateDeleteStudent,
  } = useDeleteStudentModal();

  useEffect(() => {
    if (isSuccessMutateDeleteStudent) {
      onClose();
      refetchStudent();
      setSelectedId("");
    }
  }, [isSuccessMutateDeleteStudent, onClose, refetchStudent]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Student</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure want to delete this student ?
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
            disabled={isPendingMutateDeleteStudent}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteStudent}
            onPress={() => mutateDeleteStudent(selectedId)}
          >
            {isPendingMutateDeleteStudent ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Student"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteStudentModal;
