import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const parentServices = {
  getParents: (params?: string) => instance.get(`${endpoint.PARENT}?${params}`),
};

export default parentServices;
