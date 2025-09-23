import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const attendanceServices = {
  getAttendance: (params?: string) =>
    instance.get(`${endpoint.ATTENDANCE}?${params}`),

  deleteAttendance: (id: string) =>
    instance.delete(`${endpoint.ATTENDANCE}/${id}`),
};

export default attendanceServices;
