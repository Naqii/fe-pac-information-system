import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IStudent } from "@/types/Student";

const studentServices = {
  getStudent: (params?: string) =>
    instance.get(`${endpoint.STUDENT}?${params}`),
  addEvent: (payload: IStudent) => instance.post(endpoint.STUDENT, payload),
  deleteStudent: (id: string) => instance.delete(`${endpoint.STUDENT}/${id}`),

  searchLocationByRegency: (name: string) =>
    instance.get(`${endpoint.REGION}-search?name=${name}`),
};

export default studentServices;
