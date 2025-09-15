import { DateValue } from "@heroui/react";

interface ITeacher {
  _id?: string;
  teacherName?: string;
  picture?: string | FileList;
  startDate?: string | DateValue;
  endDate?: string | DateValue;
  noTelp?: string;
  bidang?: string;
  gender?: string;
  pendidikan?: string;
  slug?: string;
}

export type { ITeacher };
