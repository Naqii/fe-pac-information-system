import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ITeacher } from "@/types/Teacher";

const teacherService = {
  getTeacher: (params?: string) =>
    instance.get(`${endpoint.TEACHER}?${params}`),
  addTeacher: (payload: ITeacher) => instance.post(endpoint.TEACHER, payload),
  deleteTeacher: (id: string) => instance.delete(`${endpoint.TEACHER}/${id}`),
};

export default teacherService;
