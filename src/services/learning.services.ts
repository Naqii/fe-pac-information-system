import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ILearning } from "@/types/Learning";

const learningServices = {
  getLearning: (params?: string) =>
    instance.get(`${endpoint.LEARNING}?${params}`),
  getLearningById: (id: string) => instance.get(`${endpoint.LEARNING}/${id}`),
  addLearning: (payload: ILearning) =>
    instance.post(endpoint.LEARNING, payload),
  updateLearning: (id: string, payload: ILearning) =>
    instance.put(`${endpoint.LEARNING}/${id}`, payload),
  deleteLearning: (id: string) => instance.delete(`${endpoint.LEARNING}/${id}`),
};

export default learningServices;
