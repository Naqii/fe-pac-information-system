import { LIMIT_TEACHER, PAGE_DEFAULT } from "@/constants/list.constants";
import teacherService from "@/services/teacher.service";
import { useQuery } from "@tanstack/react-query";

const useHome = () => {
  const getTeacher = async (params: string) => {
    const res = await teacherService.getTeacher(params);
    const { data } = res;
    return data;
  };

  const currentTeacherQuery = `limit=${LIMIT_TEACHER}&page=${PAGE_DEFAULT}`;

  const { data: dataTeacher, isLoading: isLoadingTeachers } = useQuery({
    queryKey: ["Teachers"],
    queryFn: () => getTeacher(`${currentTeacherQuery}`),
  });

  return {
    dataTeacher,
    isLoadingTeachers,
  };
};

export default useHome;
