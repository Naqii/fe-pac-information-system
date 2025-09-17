import { useEffect } from "react";
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
  Radio,
  RadioGroup,
  Spinner,
  Textarea,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import useAddParentModal from "./useAddParentModal";
import { IRegency } from "@/types/Student";

interface PropType {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchParents: () => void;
}

const AddParentModal = (props: PropType) => {
  const { isOpen, onClose, onOpenChange, refetchParents } = props;
  const {
    control,
    errors,
    handleSubmitForm,
    handleAddParent,
    isPendingMutateAddParent,
    isSuccessMutateAddParent,

    dataRegion,
    handleSearchRegion,
    searchRegency,
  } = useAddParentModal();

  useEffect(() => {
    if (isSuccessMutateAddParent) {
      onClose();
      refetchParents();
    }
  }, [isSuccessMutateAddParent, onClose, refetchParents]);

  const disabledSubmit = isPendingMutateAddParent;

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={() => onClose}
    >
      <form onSubmit={handleSubmitForm(handleAddParent)}>
        <ModalContent className="mt-4">
          <ModalHeader>Add Parent</ModalHeader>
          <ModalBody>
            <div className="flex flex-col">
              <p className="mb-4 text-sm font-bold">Information</p>
              <div className="mb-2 flex flex-col gap-2">
                <Controller
                  name="parentName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      autoFocus
                      label="Parent Name"
                      variant="bordered"
                      isInvalid={errors.parentName !== undefined}
                      errorMessage={errors.parentName?.message}
                    />
                  )}
                />
                <Controller
                  name="noTlp"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Phone Number"
                      variant="bordered"
                      isInvalid={errors.noTlp !== undefined}
                      errorMessage={errors.noTlp?.message}
                    />
                  )}
                />
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      label="Jenis Kelamin"
                      isInvalid={errors.gender !== undefined}
                      errorMessage={errors.gender?.message}
                      orientation="horizontal"
                      color="success"
                    >
                      <Radio value="Bapak">Bapak</Radio>
                      <Radio value="Ibu">Ibu</Radio>
                    </RadioGroup>
                  )}
                />
                <Controller
                  name="poss"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Dapukan"
                      variant="bordered"
                      isInvalid={errors.poss !== undefined}
                      errorMessage={errors.poss?.message}
                    />
                  )}
                />
                <Controller
                  name="region"
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <Autocomplete
                      {...field}
                      defaultItems={
                        dataRegion?.data.data && searchRegency !== ""
                          ? dataRegion?.data.data
                          : []
                      }
                      label="City"
                      variant="bordered"
                      onInputChange={(search) => handleSearchRegion(search)}
                      isInvalid={errors.region !== undefined}
                      errorMessage={errors.region?.message}
                      onSelectionChange={(value) => onChange(value)}
                      placeholder="Search City Here"
                    >
                      {(regency: IRegency) => (
                        <AutocompleteItem key={`${regency.id}`}>
                          {regency.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                />
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      label="Address"
                      variant="bordered"
                      isInvalid={errors.address !== undefined}
                      errorMessage={errors.address?.message}
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
              onPress={() => onClose}
              disabled={disabledSubmit}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#006d63] text-white"
              type="submit"
              disabled={disabledSubmit}
            >
              {isPendingMutateAddParent ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Parent"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddParentModal;
