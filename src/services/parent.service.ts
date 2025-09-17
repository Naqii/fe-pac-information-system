import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IParent } from "@/types/Parent";

const parentServices = {
  getParents: (params?: string) => instance.get(`${endpoint.PARENT}?${params}`),
  getParentById: (id: string) => instance.get(`${endpoint.PARENT}/${id}`),
  addParent: (payload: IParent) => instance.post(endpoint.PARENT, payload),
  updateParent: (id: string, payload: IParent) =>
    instance.put(`${endpoint.PARENT}/${id}`, payload),
  deleteParent: (id: string) => instance.delete(`${endpoint.PARENT}/${id}`),
};

export default parentServices;
