import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const pcServices = {
  getPC: (params?: string) => instance.get(`${endpoint.PC}?${params}`),
};

export default pcServices;
