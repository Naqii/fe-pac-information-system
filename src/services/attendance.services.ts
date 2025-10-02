import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IAttendance, IAttendanceForm } from "@/types/Attendance";

const attendanceServices = {
  getAttendance: (params?: string) =>
    instance.get(`${endpoint.ATTENDANCE}?${params}`),

  addAttendance: (payload: IAttendance) =>
    instance.post(endpoint.ATTENDANCE, payload),

  upsertAttendance: (id: string, payload: IAttendanceForm) =>
    instance.put(`${endpoint.ATTENDANCE}/${id}`, payload),

  getRecap: (params?: string) =>
    instance.get(`${endpoint.ATTENDANCE}/recap?${params}`),

  getExport: (params?: string) =>
    instance.get(`${endpoint.ATTENDANCE}/export?${params}`, {
      responseType: "blob",
    }),

  deleteAttendance: (id: string) =>
    instance.delete(`${endpoint.ATTENDANCE}/${id}`),
};

export default attendanceServices;
