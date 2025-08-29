import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const classServices = {
  getClass: (params?: string) => instance.get(`${endpoint.CLASS}?${params}`),
};

export default classServices;
