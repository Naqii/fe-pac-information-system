import { useEffect } from "react";
import useAddTeacherModal from "./useAddTeacherModal";
import { getLocalTimeZone, now } from "@internationalized/date";
import {
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
} from "@heroui/react";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";

interface PropType {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchTeachers: () => void;
}

const AddTeacherModal = (props: PropType) => {
  const { isOpen, onClose, onOpenChange, refetchTeachers } = props;
  const {
    control,
    errors,
    handleSubmitForm,
    handleAddTeacher,
    isPendingMutateAddTeacher,
    isSuccessMutateAddTeacher,

    preview,
    handleUploadPicture,
    isPendingMutateUploadFile,
    handleDeletePicture,
    isPendingMutateDeleteFile,
    handleOnClose,
    setValue,
  } = useAddTeacherModal();

  useEffect(() => {
    if (isSuccessMutateAddTeacher) {
      onClose();
      refetchTeachers();
    }
  }, [isSuccessMutateAddTeacher, onClose, refetchTeachers]);

  const disabledSubmit =
    isPendingMutateAddTeacher ||
    isPendingMutateUploadFile ||
    isPendingMutateDeleteFile;

  useEffect(() => {
    setValue("startDate", now(getLocalTimeZone()));
  }, [onOpenChange]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmitForm(handleAddTeacher)}>
        <ModalContent className="mt-4">
          <ModalHeader>Add Teacher</ModalHeader>
          <ModalBody>
            <div className="flex flex-col">
              <p className="mb-4 text-sm font-bold">Information</p>
              <div className="mb-2 flex flex-col gap-2">
                <Controller
                  name="teacherName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      autoFocus
                      label="Nama"
                      variant="bordered"
                      isInvalid={errors.teacherName !== undefined}
                      errorMessage={errors.teacherName?.message}
                    />
                  )}
                />
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Mulai Bertugas"
                      variant="bordered"
                      hideTimeZone
                      showMonthAndYearPickers
                      granularity="day"
                      isInvalid={errors.startDate !== undefined}
                      errorMessage={errors.startDate?.message}
                    />
                  )}
                />
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Selesai Bertugas"
                      variant="bordered"
                      hideTimeZone
                      showMonthAndYearPickers
                      granularity="day"
                      isInvalid={errors.endDate !== undefined}
                      errorMessage={errors.endDate?.message}
                    />
                  )}
                />
                <Controller
                  name="noTelp"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Nomor Telepon"
                      variant="bordered"
                      isInvalid={errors.noTelp !== undefined}
                      errorMessage={errors.noTelp?.message}
                    />
                  )}
                />
                <Controller
                  name="bidang"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Bidang"
                      variant="bordered"
                      isInvalid={errors.bidang !== undefined}
                      errorMessage={errors.bidang?.message}
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
                  name="pendidikan"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Pendidikan Terakhir"
                      variant="bordered"
                      isInvalid={errors.pendidikan !== undefined}
                      errorMessage={errors.pendidikan?.message}
                    />
                  )}
                />
                <Controller
                  name="slug"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Slug"
                      variant="bordered"
                      isInvalid={errors.slug !== undefined}
                      errorMessage={errors.slug?.message}
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
              {isPendingMutateAddTeacher ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Teacher"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddTeacherModal;
