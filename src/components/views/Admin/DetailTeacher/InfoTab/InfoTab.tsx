import useInfoTab from "./useInfoTab";
import { useEffect } from "react";
import { toInputDate } from "@/utils/date";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { ITeacher } from "@/types/Teacher";

interface PropType {
  dataTeacher?: ITeacher;
  onUpdate: (data: ITeacher) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = (props: PropType) => {
  const { dataTeacher, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  } = useInfoTab();

  useEffect(() => {
    if (dataTeacher) {
      setValueUpdateInfo("teacherName", `${dataTeacher?.teacherName}`);
      setValueUpdateInfo("noTelp", `${dataTeacher?.noTelp}`);
      setValueUpdateInfo("gender", `${dataTeacher?.gender}`);
      if (dataTeacher?.startDate) {
        setValueUpdateInfo(
          "startDate",
          toInputDate(`${dataTeacher.startDate}`),
        );
      }
      setValueUpdateInfo("bidang", `${dataTeacher?.bidang}`);
      setValueUpdateInfo("pendidikan", `${dataTeacher?.pendidikan}`);
      setValueUpdateInfo("slug", `${dataTeacher?.slug}`);
    }
  }, [setValueUpdateInfo, dataTeacher]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdate, resetUpdateInfo]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Teacher Information</h1>
        <p className="text-small text-default-400 w-full">
          Manage information of this Teacher
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton
            isLoaded={!!dataTeacher?.teacherName}
            className="rounded-lg"
          >
            <Controller
              name="teacherName"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Name"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorsUpdateInfo.teacherName !== undefined}
                  errorMessage={errorsUpdateInfo.teacherName?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataTeacher?.gender} className="rounded-lg">
            <Controller
              name="gender"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Gender"
                  variant="bordered"
                  labelPlacement="outside"
                  defaultSelectedKeys={
                    dataTeacher?.gender ? [dataTeacher.gender] : []
                  }
                  isInvalid={errorsUpdateInfo.gender !== undefined}
                  errorMessage={errorsUpdateInfo.gender?.message}
                  disallowEmptySelection
                  placeholder="Choose Gender"
                >
                  <SelectItem key="Laki-laki">Laki-laki</SelectItem>
                  <SelectItem key="Perempuan">Perempuan</SelectItem>
                </Select>
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataTeacher?.startDate} className="rounded-lg">
            <Controller
              name="startDate"
              control={controlUpdateInfo}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Mulai Bertugas"
                  variant="bordered"
                  hideTimeZone
                  showMonthAndYearPickers
                  granularity="day"
                  isInvalid={errorsUpdateInfo.startDate !== undefined}
                  errorMessage={errorsUpdateInfo.startDate?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataTeacher?.endDate} className="rounded-lg">
            <Controller
              name="endDate"
              control={controlUpdateInfo}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Selesai Bertugas"
                  variant="bordered"
                  hideTimeZone
                  showMonthAndYearPickers
                  granularity="day"
                  isInvalid={errorsUpdateInfo.endDate !== undefined}
                  errorMessage={errorsUpdateInfo.endDate?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataTeacher?.noTelp} className="rounded-lg">
            <Controller
              name="noTelp"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  label="No Telephone"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorsUpdateInfo.noTelp !== undefined}
                  errorMessage={errorsUpdateInfo.noTelp?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataTeacher?.noTelp} className="rounded-lg">
            <Controller
              name="bidang"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Bidang"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorsUpdateInfo.bidang !== undefined}
                  errorMessage={errorsUpdateInfo.bidang?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataTeacher?.slug} className="rounded-lg">
            <Controller
              name="slug"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Slug"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorsUpdateInfo.slug !== undefined}
                  errorMessage={errorsUpdateInfo.slug?.message}
                />
              )}
            />
          </Skeleton>
          <Button
            className="disabled:bg-default-500 mt-2 bg-[#006d63] text-white"
            type="submit"
            disabled={isPendingUpdate || !dataTeacher?._id}
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
