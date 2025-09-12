import { DateValue } from "@heroui/react";

interface IRegency {
  id: string;
  name: string;
}
interface IStudent {
  _id?: string;
  fullName?: string;
  picture?: string | FileList;
  noTlp?: string;
  gender?: string;
  parentName?: string;
  className?: string;
  tanggalLahir?: string | DateValue;
  location?: {
    address: string;
    region: string;
  };
}

interface IStudentForm extends IStudent {
  region?: string;
  address?: string;
}

export type { IRegency, IStudent, IStudentForm };
