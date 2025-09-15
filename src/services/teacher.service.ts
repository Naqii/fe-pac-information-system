import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ITeacher } from "@/types/Teacher";

const teacherService = {
  getTeacher: (params?: string) =>
    instance.get(`${endpoint.TEACHER}?${params}`),
  getTeacherById: (id: string) => instance.get(`${endpoint.TEACHER}/${id}`),
  addTeacher: (payload: ITeacher) => instance.post(endpoint.TEACHER, payload),
  updateTeacher: (id: string, payload: ITeacher) =>
    instance.put(`${endpoint.TEACHER}/${id}`, payload),
  deleteTeacher: (id: string) => instance.delete(`${endpoint.TEACHER}/${id}`),
};

export default teacherService;
