import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schemaUpdatePicture = Yup.object().shape({
  picture: Yup.mixed<FileList | string>().required("Please input picture"),
});

const usePictureTab = () => {
  const {
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,

    handleUploadFile,
    handleDeleteFile,
  } = useMediaHandling();

  const {
    control: controlUpdatePicture,
    handleSubmit: handleSubmitUpdatePicture,
    formState: { errors: errorUpdatePicture },
    reset: resetUpdatePicture,
    watch: watchUpdatePicture,
    getValues: getValuesUpdatePicture,
    setValue: setValuesUpdatePicture,
  } = useForm({
    resolver: yupResolver(schemaUpdatePicture),
    defaultValues: {
      picture: "",
    },
  });

  const preview = watchUpdatePicture("picture");
  const fileUrl = getValuesUpdatePicture("picture");

  const handleUploadPicture = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValuesUpdatePicture("picture", fileUrl);
      }
    });
  };

  const handleDeletePicture = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  return {
    handleDeletePicture,
    handleUploadPicture,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    controlUpdatePicture,
    handleSubmitUpdatePicture,
    errorUpdatePicture,
    resetUpdatePicture,

    preview,
  };
};

export default usePictureTab;
