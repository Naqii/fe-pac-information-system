import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteTeacherModal from "./useDeleteTeacherModal";
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
  refetchTeacher: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteTeacherModal = (props: PropTypes) => {
  const {
    isOpen,
    onOpenChange,
    onClose,
    refetchTeacher,
    selectedId,
    setSelectedId,
  } = props;

  const {
    mutateDeleteTeacher,
    isPendingMutateDeleteTeacher,
    isSuccessMutateDeleteTeacher,
  } = useDeleteTeacherModal();

  useEffect(() => {
    if (isSuccessMutateDeleteTeacher) {
      onClose();
      refetchTeacher();
      setSelectedId("");
    }
  }, [isSuccessMutateDeleteTeacher, onClose, refetchTeacher]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Teacher</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure want to delete this teacher ?
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
            disabled={isPendingMutateDeleteTeacher}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteTeacher}
            onPress={() => mutateDeleteTeacher(selectedId)}
          >
            {isPendingMutateDeleteTeacher ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Teacher"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteTeacherModal;
