import { LIMIT_LIST } from "@/constants/list.constants";
import useChangeUrl from "@/hooks/useChangeUrl";
import { cn } from "@/utils/cn";
import {
  Button,
  DatePicker,
  DateValue,
  Input,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs,
} from "@heroui/react";
import { Key, ReactNode, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useTableDataAttendance } from "./useTableDataAttendance";
import { useRouter } from "next/router";

interface PropTypes {
  buttonTopContentLabel?: string;
  columns: Record<string, unknown>[];
  data: Record<string, unknown>[];
  emptyContent: string;
  isLoading?: boolean;
  onClickButtonTopContent?: () => void;
  renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
  showLimit?: boolean;
  showSearch?: boolean;
  showClass?: string;
  totalPages: number;
  tabsContent: string;
  buttonBotRecap?: string;
}

const DataTableAttendance = (props: PropTypes) => {
  const router = useRouter();
  const {
    currentLimit,
    currentPage,
    currentClass,

    handleChangeLimit,
    handleChangePage,
    handleSearch,
    handleClearSearch,
    handleChangeClass,
  } = useChangeUrl();

  const {
    buttonTopContentLabel,
    columns,
    data,
    emptyContent,
    isLoading,
    onClickButtonTopContent,
    renderCell,
    totalPages,
    showLimit = true,
    showSearch = true,
    tabsContent = true,
    buttonBotRecap = true,
  } = props;

  const { displayedData } = useTableDataAttendance(data, isLoading ?? false);
  const [selectedDate, setSelectedDate] = useState<DateValue | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleGoToRecap = () => {
    if (!currentClass || !selectedDate) return;

    const month = selectedDate.month;
    const year = selectedDate.year;

    router.push(
      `/admin/attendance/recap?className=${currentClass}&month=${month}&year=${year}`,
    );
  };

  const TopContent = useMemo(() => {
    return (
      <div className="flex flex-col-reverse items-start justify-between gap-y-4 lg:flex-row lg:items-center">
        {tabsContent && (
          <Tabs
            selectedKey={String(currentClass)}
            onSelectionChange={(key) => handleChangeClass(String(key))}
            variant="solid"
            aria-label="Option Class"
          >
            <Tab key="68ad2af44b23429a397378bc" title="PraRemaja" />
            <Tab key="68ad2af84b23429a397378bf" title="Remaja" />
            <Tab key="68ad2b054b23429a397378c2" title="Usman" />
          </Tabs>
        )}
        {showSearch && (
          <Input
            isClearable
            className="w-full sm:max-w-[24%]"
            placeholder="Search by name"
            startContent={<CiSearch />}
            onClear={handleClearSearch}
            onChange={handleSearch}
            aria-label="Search by name"
          />
        )}
        {buttonTopContentLabel && (
          <Button
            className="bg-[#006d63] text-white"
            onPress={onClickButtonTopContent}
            aria-label={buttonTopContentLabel || "Perform action"}
          >
            {buttonTopContentLabel}
          </Button>
        )}
      </div>
    );
  }, [
    currentClass,
    tabsContent,
    buttonTopContentLabel,
    handleClearSearch,
    handleSearch,
    handleChangeClass,
    onClickButtonTopContent,
    showSearch,
  ]);

  const BottomContent = useMemo(() => {
    return (
      <div className="flex items-center gap-2">
        {showLimit && (
          <Select
            className="hidden max-w-36 lg:block"
            size="md"
            selectedKeys={[`${currentLimit}`]}
            selectionMode="single"
            onChange={handleChangeLimit}
            startContent={<p className="text-small">Show:</p>}
            disallowEmptySelection
            aria-label="Select number of items to display"
          >
            {LIMIT_LIST.map((item) => (
              <SelectItem key={item.value}>{item.label}</SelectItem>
            ))}
          </Select>
        )}
        {buttonBotRecap && (
          <div className="flex items-center gap-2">
            <DatePicker
              variant="flat"
              hideTimeZone
              showMonthAndYearPickers
              onChange={(date) => setSelectedDate(date)}
              aria-label="Select month for recap"
            />
            <Button
              size="md"
              className="bg-[#006d63] text-white"
              onPress={handleGoToRecap}
              isDisabled={!selectedDate}
            >
              Recap
            </Button>
          </div>
        )}
        {totalPages > 1 && (
          <Pagination
            isCompact
            showControls
            page={Number(currentPage)}
            total={totalPages}
            onChange={handleChangePage}
            loop
            variant="flat"
            aria-label="Pagination Navigation"
            classNames={{
              cursor: "bg-[#006d63] text-white shadow-md",
              item: "hover:bg-[#e6f7f5] text-[#006d63]",
            }}
          />
        )}
      </div>
    );
  }, [
    showLimit,
    currentLimit,
    handleChangeLimit,
    buttonBotRecap,
    handleGoToRecap,
    selectedDate,
    totalPages,
    currentPage,
    handleChangePage,
  ]);

  return (
    <Table
      isStriped
      bottomContent={BottomContent}
      bottomContentPlacement="outside"
      aria-label="Data Table"
      classNames={{
        base: "max-w-full transition-all",
        wrapper: cn({ "overflow-x-hidden": isLoading }),
      }}
      topContent={TopContent}
      topContentPlacement="outside"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid as Key}>
            {(column.name ?? "Unnamed Column") as string}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={emptyContent}
        isLoading={isLoading}
        items={displayedData}
        loadingContent={
          <div className="bg-foreground-700/30 flex h-full w-full items-center justify-center backdrop-blur-sm">
            <Spinner
              color="default"
              classNames={{
                circle1: "border-[#006d63]",
              }}
            />
          </div>
        }
      >
        {(item) => (
          <TableRow key={item._id as Key}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTableAttendance;
