import { Dispatch, SetStateAction, useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import useDeleteParentModal from "./useDeleteParentModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchParent: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteParentModal = (props: PropTypes) => {
  const {
    isOpen,
    onOpenChange,
    onClose,
    refetchParent,
    selectedId,
    setSelectedId,
  } = props;

  const {
    mutateDeleteParent,
    isPendingMutateDeleteParent,
    isSuccessMutateDeleteParent,
  } = useDeleteParentModal();

  useEffect(() => {
    if (isSuccessMutateDeleteParent) {
      onClose();
      refetchParent();
      setSelectedId("");
    }
  }, [isSuccessMutateDeleteParent, onClose, refetchParent]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Parent</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure want to delete this parent ?
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
            disabled={isPendingMutateDeleteParent}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteParent}
            onPress={() => mutateDeleteParent(selectedId)}
          >
            {isPendingMutateDeleteParent ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Parent"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteParentModal;
