import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IFileURL } from "@/types/File";

const formdataHeader = {
  headers: {
    "Content-Type": "multipart/from-data",
  },
};

const uploadServices = {
  uploadFile: (payload: FormData) =>
    instance.post(`${endpoint.MEDIA}/single-upload`, payload, formdataHeader),
  deleteFile: (payload: IFileURL) =>
    instance.delete(`${endpoint.MEDIA}/remove`, { data: payload }),
};

export default uploadServices;
