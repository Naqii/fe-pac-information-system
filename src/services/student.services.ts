import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const studentServices = {
  getStudent: (params?: string) =>
    instance.get(`${endpoint.STUDENT}?${params}`),
};

export default studentServices;
