import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IAttendance } from "@/types/Attendance";

const attendanceServices = {
  getAttendance: (params?: string) =>
    instance.get(`${endpoint.ATTENDANCE}?${params}`),
  addAttendance: (payload: IAttendance) =>
    instance.post(endpoint.ATTENDANCE, payload),
  deleteAttendance: (id: string) =>
    instance.delete(`${endpoint.ATTENDANCE}/${id}`),
};

export default attendanceServices;
