import useInfoTab from "./useInfoTab";
import { useEffect } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  NumberInput,
  Skeleton,
  Spinner,
  Textarea,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { ILearning } from "@/types/Learning";
import { ITeacher } from "@/types/Teacher";

interface PropType {
  dataLearning?: ILearning;
  onUpdate: (data: ILearning) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = (props: PropType) => {
  const { dataLearning, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    dataTeacher,

    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  } = useInfoTab();

  useEffect(() => {
    if (dataLearning) {
      setValueUpdateInfo("learningName", `${dataLearning?.learningName}`);
      setValueUpdateInfo("totalPage", dataLearning?.totalPage ?? 0);
      setValueUpdateInfo("teacherId", `${dataLearning?.teacherId}`);
      setValueUpdateInfo("description", `${dataLearning?.description}`);
    }
  }, [setValueUpdateInfo, dataLearning]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdate, resetUpdateInfo]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Learning Information</h1>
        <p className="text-small text-default-400 w-full">
          Manage information of this Learning
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton
            isLoaded={!!dataLearning?.learningName}
            className="rounded-lg"
          >
            <Controller
              name="learningName"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Name"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorsUpdateInfo.learningName !== undefined}
                  errorMessage={errorsUpdateInfo.learningName?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataLearning?.totalPage} className="rounded-lg">
            <Controller
              name="totalPage"
              control={controlUpdateInfo}
              render={({ field }) => (
                <NumberInput
                  {...field}
                  label="Total Page"
                  variant="bordered"
                  labelPlacement="outside"
                  isInvalid={errorsUpdateInfo.totalPage !== undefined}
                  errorMessage={errorsUpdateInfo.totalPage?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataLearning?.teacherId} className="rounded-lg">
            <Controller
              name="teacherId"
              control={controlUpdateInfo}
              render={({ field: { value, onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  selectedKey={value}
                  defaultItems={dataTeacher?.data.data || []}
                  label="Teacher"
                  labelPlacement="outside"
                  variant="bordered"
                  isInvalid={errorsUpdateInfo.teacherId !== undefined}
                  errorMessage={errorsUpdateInfo.teacherId?.message}
                  onSelectionChange={(key) => onChange(key)}
                  placeholder="Search Teacher Here"
                >
                  {(t: ITeacher) => (
                    <AutocompleteItem key={`${t._id}`}>
                      {t.teacherName}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            />
          </Skeleton>
          <Skeleton
            isLoaded={!!dataLearning?.description}
            className="rounded-lg"
          >
            <Controller
              name="description"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Description"
                  variant="bordered"
                  isInvalid={errorsUpdateInfo.description !== undefined}
                  errorMessage={errorsUpdateInfo.description?.message}
                  className="mb-2"
                />
              )}
            />
          </Skeleton>
          <Button
            className="disabled:bg-default-500 mt-2 bg-[#006d63] text-white"
            type="submit"
            disabled={isPendingUpdate || !dataLearning?._id}
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

export default InfoTab;
