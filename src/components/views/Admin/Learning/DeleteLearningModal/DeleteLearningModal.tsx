import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteLearningModal from "./useDeleteLearningModal";
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
  refetchLearning: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteLearningModal = (props: PropTypes) => {
  const {
    isOpen,
    onOpenChange,
    onClose,
    refetchLearning,
    selectedId,
    setSelectedId,
  } = props;

  const {
    mutateDeleteLearning,
    isPendingMutateDeleteLearning,
    isSuccessMutateDeleteLearning,
  } = useDeleteLearningModal();

  useEffect(() => {
    if (isSuccessMutateDeleteLearning) {
      onClose();
      refetchLearning();
      setSelectedId("");
    }
  }, [isSuccessMutateDeleteLearning, onClose, refetchLearning]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Learning</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure want to delete this learning ?
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
            disabled={isPendingMutateDeleteLearning}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteLearning}
            onPress={() => mutateDeleteLearning(selectedId)}
          >
            {isPendingMutateDeleteLearning ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Learning"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteLearningModal;
