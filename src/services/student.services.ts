import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IStudent } from "@/types/Student";

const studentServices = {
  getStudent: (params?: string) =>
    instance.get(`${endpoint.STUDENT}?${params}`),
  getStudentById: (id: string) => instance.get(`${endpoint.STUDENT}/${id}`),
  addStudent: (payload: IStudent) => instance.post(endpoint.STUDENT, payload),
  updateStudent: (id: string, payload: IStudent) =>
    instance.put(`${endpoint.STUDENT}/${id}`, payload),
  deleteStudent: (id: string) => instance.delete(`${endpoint.STUDENT}/${id}`),

  searchLocationByRegency: (name: string) =>
    instance.get(`${endpoint.REGION}-search?name=${name}`),
  getRegencyById: (id: string) =>
    instance.get(`${endpoint.REGION}/${id}/regency`),
};

export default studentServices;
