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
  Select,
  SelectItem,
  Skeleton,
  Spinner,
  Textarea,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { IParent, IParentForm } from "@/types/Parent";
import { IRegency } from "@/types/Student";

interface PropType {
  dataParent?: IParent;
  dataDefaultRegion: string;
  isPendingDefaultRegion: boolean;
  onUpdate: (data: IParentForm) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = (props: PropType) => {
  const {
    dataParent,
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

    dataRegion,
    handleSearchRegion,
    searchRegency,
  } = useInfoTab();

  useEffect(() => {
    if (dataParent) {
      setValueUpdateInfo("parentName", `${dataParent?.parentName}`);
      setValueUpdateInfo("noTlp", `${dataParent?.noTlp}`);
      setValueUpdateInfo("gender", `${dataParent?.gender}`);
      setValueUpdateInfo("poss", `${dataParent?.poss}`);
      setValueUpdateInfo("region", `${dataParent?.location?.region}`);
      setValueUpdateInfo("address", `${dataParent?.location?.address}`);
    }
  }, [setValueUpdateInfo, dataParent]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdate, resetUpdateInfo]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Parent Information</h1>
        <p className="text-small text-default-400 w-full">
          Manage information of this Parent
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton isLoaded={!!dataParent?.parentName} className="rounded-lg">
            <Controller
              name="parentName"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Name"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorsUpdateInfo.parentName !== undefined}
                  errorMessage={errorsUpdateInfo.parentName?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataParent?.noTlp} className="rounded-lg">
            <Controller
              name="noTlp"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Phone Number"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorsUpdateInfo.noTlp !== undefined}
                  errorMessage={errorsUpdateInfo.noTlp?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataParent?.gender} className="rounded-lg">
            <Controller
              name="gender"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Gender"
                  variant="bordered"
                  labelPlacement="outside"
                  selectedKeys={field.value ? [field.value] : []}
                  isInvalid={errorsUpdateInfo.gender !== undefined}
                  errorMessage={errorsUpdateInfo.gender?.message}
                  disallowEmptySelection
                  placeholder="Choose Gender"
                >
                  <SelectItem key="Bapak">Bapak</SelectItem>
                  <SelectItem key="Ibu">Ibu</SelectItem>
                </Select>
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataParent?.poss} className="rounded-lg">
            <Controller
              name="poss"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Dapukan"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorsUpdateInfo.poss !== undefined}
                  errorMessage={errorsUpdateInfo.poss?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton
            isLoaded={!!dataParent?.location?.region && !isPendingDefaultRegion}
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
            isLoaded={!!dataParent?.location?.address}
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
            disabled={isPendingUpdate || !dataParent?._id}
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
