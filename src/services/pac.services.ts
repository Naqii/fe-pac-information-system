import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const pacServices = {
  getPAC: (params?: string) => instance.get(`${endpoint.PAC}?${params}`),
};

export default pacServices;
