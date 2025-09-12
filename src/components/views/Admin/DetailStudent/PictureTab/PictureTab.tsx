import { IStudent } from "@/types/Student";
import usePictureTab from "./usePictureTab";
import { useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@heroui/react";
import Image from "next/image";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";

interface PropType {
  currnetPicture: string;
  onUpdate: (data: IStudent) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const PictureTab = (props: PropType) => {
  const { currnetPicture, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    handleDeletePicture,
    handleUploadPicture,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    controlUpdatePicture,
    handleSubmitUpdatePicture,
    errorUpdatePicture,
    resetUpdatePicture,

    preview,
  } = usePictureTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdatePicture();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Student Picture</h1>
        <p className="text-small text-default-400 w-full">
          Manage Students Picture
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdatePicture(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-default-700 text-sm font-medium">
              Current Picture
            </p>
            <Skeleton
              isLoaded={!!currnetPicture}
              className="aspect-square rounded-full"
            >
              <Image
                src={currnetPicture || "/images/general/man.webp"}
                alt="picture"
                fill
                className="!relative"
              />
            </Skeleton>
          </div>
          <Controller
            name="picture"
            control={controlUpdatePicture}
            render={({ field: { onChange, value, ...field } }) => (
              <InputFile
                {...field}
                onDelete={() => handleDeletePicture(onChange)}
                onUpload={(files) => handleUploadPicture(files, onChange)}
                isUploading={isPendingMutateUploadFile}
                isDeleting={isPendingMutateDeleteFile}
                isInvalid={errorUpdatePicture.picture !== undefined}
                errorMessage={errorUpdatePicture.picture?.message}
                isDropable
                label={
                  <p className="text-default-700 mb-2 text-sm font-medium">
                    Upload New Picture
                  </p>
                }
                preview={typeof preview === "string" ? preview : ""}
              />
            )}
          />
          <Button
            className="disabled:bg-default-500 mt-2 bg-[#006d63] text-white"
            type="submit"
            disabled={isPendingMutateUploadFile || isPendingUpdate || !preview}
          >
            {isPendingUpdate ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default PictureTab;
