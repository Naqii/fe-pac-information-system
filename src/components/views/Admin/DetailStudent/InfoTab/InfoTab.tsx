import { IRegency, IStudent, IStudentForm } from "@/types/Student";
import useInfoTab from "./useInfoTab";
import { useEffect } from "react";
import { toInputDate } from "@/utils/date";
import {
  Autocomplete,
  AutocompleteItem,
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
  Textarea,
} from "@heroui/react";
import { Controller } from "react-hook-form";

interface PropType {
  dataStudent?: IStudentForm;
  dataDefaultRegion: string;
  isPendingDefaultRegion: boolean;
  onUpdate: (data: IStudentForm) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = (props: PropType) => {
  const {
    dataStudent,
    onUpdate,
    isPendingDefaultRegion,
    dataDefaultRegion,
    isPendingUpdate,
    isSuccessUpdate,
  } = props;
  const {
    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
    handleSearchRegion,

    dataClass,
    dataParent,
    dataRegion,
  } = useInfoTab();

  useEffect(() => {
    if (dataStudent) {
      setValueUpdateInfo("fullName", `${dataStudent?.fullName}`);
      setValueUpdateInfo("noTlp", `${dataStudent?.noTlp}`);
      setValueUpdateInfo("gender", `${dataStudent?.gender}`);
      setValueUpdateInfo("parentName", `${dataStudent?.parentName}`);
      setValueUpdateInfo("className", `${dataStudent?.className}`);
      if (dataStudent?.tanggalLahir) {
        setValueUpdateInfo(
          "tanggalLahir",
          toInputDate(`${dataStudent.tanggalLahir}`),
        );
      }
      setValueUpdateInfo("region", `${dataStudent?.location?.region}`);
      setValueUpdateInfo("address", `${dataStudent?.location?.address}`);
    }
  }, [setValueUpdateInfo, dataStudent]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdate, resetUpdateInfo]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Student Information</h1>
        <p className="text-small text-default-400 w-full">
          Manage information of this Student
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton isLoaded={!!dataStudent?.fullName} className="rounded-lg">
            <Controller
              name="fullName"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Name"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorsUpdateInfo.fullName !== undefined}
                  errorMessage={errorsUpdateInfo.fullName?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataStudent?.noTlp} className="rounded-lg">
            <Controller
              name="noTlp"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  label="No Telephone"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorsUpdateInfo.noTlp !== undefined}
                  errorMessage={errorsUpdateInfo.noTlp?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataStudent?.gender} className="rounded-lg">
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
                    dataStudent?.gender ? [dataStudent.gender] : []
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
          <Skeleton isLoaded={!!dataStudent?.parentName} className="rounded-lg">
            <Controller
              name="parentName"
              control={controlUpdateInfo}
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultItems={dataParent?.data.data || []}
                  label="Parent Student"
                  labelPlacement="outside"
                  variant="bordered"
                  defaultSelectedKey={dataStudent?.parentName}
                  isInvalid={errorsUpdateInfo.parentName !== undefined}
                  errorMessage={errorsUpdateInfo.parentName?.message}
                  onSelectionChange={(value) => onChange(value)}
                  placeholder="Search Parent Here"
                >
                  {(parent: IStudent) => (
                    <AutocompleteItem key={`${parent._id}`}>
                      {parent.parentName}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataStudent?.className} className="rounded-lg">
            <Controller
              name="className"
              control={controlUpdateInfo}
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultItems={dataClass?.data.data || []}
                  label="Class Student"
                  labelPlacement="outside"
                  variant="bordered"
                  defaultSelectedKey={dataStudent?.className}
                  isInvalid={errorsUpdateInfo.className !== undefined}
                  errorMessage={errorsUpdateInfo.className?.message}
                  onSelectionChange={(value) => onChange(value)}
                  placeholder="Search Class Here"
                >
                  {(kelas: IStudent) => (
                    <AutocompleteItem key={`${kelas._id}`}>
                      {kelas.className}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            />
          </Skeleton>
          <Skeleton
            isLoaded={!!dataStudent?.tanggalLahir}
            className="rounded-lg"
          >
            <Controller
              name="tanggalLahir"
              control={controlUpdateInfo}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Tanggal Lahir"
                  variant="bordered"
                  hideTimeZone
                  showMonthAndYearPickers
                  granularity="day"
                  isInvalid={errorsUpdateInfo.tanggalLahir !== undefined}
                  errorMessage={errorsUpdateInfo.tanggalLahir?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton
            isLoaded={
              !!dataStudent?.location?.region && !isPendingDefaultRegion
            }
            className="rounded-lg"
          >
            {!isPendingDefaultRegion ? (
              <Controller
                name="region"
                control={controlUpdateInfo}
                render={({ field: { onChange, ...field } }) => (
                  <Autocomplete
                    {...field}
                    items={dataRegion?.data.data ?? []}
                    selectedKey={dataRegion?.data.data}
                    defaultInputValue={dataDefaultRegion}
                    label="City"
                    variant="bordered"
                    labelPlacement="outside"
                    onInputChange={(search) => handleSearchRegion(search)}
                    isInvalid={errorsUpdateInfo.region !== undefined}
                    errorMessage={errorsUpdateInfo.region?.message}
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
            ) : (
              <div className="h-16 w-full" />
            )}
          </Skeleton>
          <Skeleton
            isLoaded={!!dataStudent?.location?.address}
            className="rounded-lg"
          >
            <Controller
              name="address"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Address"
                  variant="bordered"
                  isInvalid={errorsUpdateInfo.address !== undefined}
                  errorMessage={errorsUpdateInfo.address?.message}
                  className="mb-2"
                />
              )}
            />
          </Skeleton>
          <Button
            className="disabled:bg-default-500 mt-2 bg-[#006d63] text-white"
            type="submit"
            disabled={isPendingUpdate || !dataStudent?._id}
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
