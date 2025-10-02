import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const classServices = {
  getClass: (params?: string) => instance.get(`${endpoint.CLASS}?${params}`),
  getClassById: (id: string) => instance.get(`${endpoint.CLASS}/${id}`),
};

export default classServices;
