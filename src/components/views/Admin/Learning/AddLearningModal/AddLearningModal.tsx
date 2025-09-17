import { useEffect } from "react";
import useAddLearningModal from "./useAddLearningModal";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  NumberInput,
  Spinner,
  Textarea,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { ITeacher } from "@/types/Teacher";

interface PropType {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchLearnings: () => void;
}

const AddLearningModal = (props: PropType) => {
  const { isOpen, onClose, onOpenChange, refetchLearnings } = props;
  const {
    control,
    errors,

    handleSubmitForm,
    handleAddLearning,
    isPendingMutateAddLearning,
    isSuccessMutateAddLearning,

    dataTeacher,
  } = useAddLearningModal();

  useEffect(() => {
    if (isSuccessMutateAddLearning) {
      onClose();
      refetchLearnings();
    }
  }, [isSuccessMutateAddLearning, onClose, refetchLearnings]);

  const disabledSubmit = isPendingMutateAddLearning;

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={() => onClose()}
    >
      <form onSubmit={handleSubmitForm(handleAddLearning)}>
        <ModalContent className="mt-4">
          <ModalHeader>Add Learning</ModalHeader>
          <ModalBody>
            <div className="flex flex-col">
              <p className="mb-4 text-sm font-bold">Information</p>
              <div className="mb-2 flex flex-col gap-2">
                <Controller
                  name="learningName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      autoFocus
                      label="Nama Materi"
                      variant="bordered"
                      isInvalid={errors.learningName !== undefined}
                      errorMessage={errors.learningName?.message}
                    />
                  )}
                />
                <Controller
                  name="totalPage"
                  control={control}
                  render={({ field }) => (
                    <NumberInput
                      {...field}
                      label="Total Halaman"
                      variant="bordered"
                      isInvalid={errors.totalPage !== undefined}
                      errorMessage={errors.totalPage?.message}
                    />
                  )}
                />
                <Controller
                  name="teacherId"
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <Autocomplete
                      {...field}
                      defaultItems={dataTeacher?.data.data || []}
                      label="Guru"
                      variant="bordered"
                      isInvalid={errors.teacherId !== undefined}
                      errorMessage={errors.teacherId?.message}
                      onSelectionChange={(value) => onChange(value)}
                      placeholder="Search Parent Here"
                    >
                      {(tc: ITeacher) => (
                        <AutocompleteItem key={`${tc._id}`}>
                          {tc.teacherName}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                />
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      label="Description"
                      variant="bordered"
                      isInvalid={errors.description !== undefined}
                      errorMessage={errors.description?.message}
                      className="mb-2"
                    />
                  )}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={() => onClose()}
              disabled={disabledSubmit}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#006d63] text-white"
              type="submit"
              disabled={disabledSubmit}
            >
              {isPendingMutateAddLearning ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Learning"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddLearningModal;
