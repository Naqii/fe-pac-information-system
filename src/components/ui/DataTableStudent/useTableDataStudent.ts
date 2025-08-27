import { useMemo } from "react";

export const useTableDataStudent = <T>(data: T[], isLoading: boolean) => {
  // Optimisasi biar nggak re-render berlebihan
  const displayedData = useMemo(() => {
    return isLoading ? [] : data;
  }, [isLoading, data]);

  return {
    displayedData,
    isEmpty: displayedData.length === 0,
    hasData: displayedData.length > 0,
  };
};
