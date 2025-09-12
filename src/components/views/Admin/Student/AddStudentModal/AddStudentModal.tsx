import { useEffect } from "react";
import useAddStudentModal from "./useAddStudentModal";
import { getLocalTimeZone, now } from "@internationalized/date";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DatePicker,
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
import { IParent } from "@/types/Parent";
import { IClass } from "@/types/Class";
import { IRegency } from "@/types/Student";
import InputFile from "@/components/ui/InputFile";

interface PropType {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchStudents: () => void;
}

const AddStudentModal = (props: PropType) => {
  const { isOpen, onClose, onOpenChange, refetchStudents } = props;
  const {
    control,
    errors,
    handleSubmitForm,
    handleAddStudent,
    isPendingMutateAddStudent,
    isSuccessMutateAddStudent,

    preview,
    handleUploadPicture,
    isPendingMutateUploadFile,
    handleDeletePicture,
    isPendingMutateDeleteFile,
    handleOnClose,
    setValue,

    dataClass,
    dataParent,
    dataRegion,
    searchRegency,
    handleSearchRegion,
  } = useAddStudentModal();

  useEffect(() => {
    if (isSuccessMutateAddStudent) {
      onClose();
      refetchStudents();
    }
  }, [isSuccessMutateAddStudent, onClose, refetchStudents]);

  const disabledSubmit =
    isPendingMutateAddStudent ||
    isPendingMutateUploadFile ||
    isPendingMutateDeleteFile;

  useEffect(() => {
    setValue("tanggalLahir", now(getLocalTimeZone()));
  }, [onOpenChange]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmitForm(handleAddStudent)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Student</ModalHeader>
          <ModalBody>
            <div className="flex flex-col">
              <p className="mb-4 text-sm font-bold">Information</p>
              <div className="mb-2 flex flex-col gap-2">
                <Controller
                  name="fullName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      autoFocus
                      label="Nama"
                      variant="bordered"
                      isInvalid={errors.fullName !== undefined}
                      errorMessage={errors.fullName?.message}
                    />
                  )}
                />
                <Controller
                  name="noTlp"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Nomor Telepon"
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
                      <Radio value="Laki-laki">Laki - laki</Radio>
                      <Radio value="Perempuan">Perempuan</Radio>
                    </RadioGroup>
                  )}
                />
                <Controller
                  name="parentName"
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <Autocomplete
                      {...field}
                      defaultItems={dataParent?.data.data || []}
                      label="Parent"
                      variant="bordered"
                      isInvalid={errors.parentName !== undefined}
                      errorMessage={errors.parentName?.message}
                      onSelectionChange={(value) => onChange(value)}
                      placeholder="Search Parent Here"
                    >
                      {(parent: IParent) => (
                        <AutocompleteItem key={`${parent._id}`}>
                          {parent.parentName}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                />
                <Controller
                  name="className"
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <Autocomplete
                      {...field}
                      defaultItems={dataClass?.data.data || []}
                      label="Class"
                      variant="bordered"
                      isInvalid={errors.className !== undefined}
                      errorMessage={errors.className?.message}
                      onSelectionChange={(value) => onChange(value)}
                      placeholder="Search Class Here"
                    >
                      {(classStudent: IClass) => (
                        <AutocompleteItem key={`${classStudent._id}`}>
                          {classStudent.className}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                />
                <Controller
                  name="tanggalLahir"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Tanggal Lahir"
                      variant="bordered"
                      hideTimeZone
                      showMonthAndYearPickers
                      granularity="day"
                      isInvalid={errors.tanggalLahir !== undefined}
                      errorMessage={errors.tanggalLahir?.message}
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
            <p className="text-sm font-bold">Picture</p>
            <Controller
              name="picture"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <InputFile
                  {...field}
                  onDelete={() => handleDeletePicture(onChange)}
                  onUpload={(files) => handleUploadPicture(files, onChange)}
                  isUploading={isPendingMutateUploadFile}
                  isDeleting={isPendingMutateDeleteFile}
                  isInvalid={errors.picture !== undefined}
                  errorMessage={errors.picture?.message}
                  isDropable
                  preview={typeof preview === "string" ? preview : ""}
                />
              )}
            />
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
              {isPendingMutateAddStudent ? (
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

export default AddStudentModal;
