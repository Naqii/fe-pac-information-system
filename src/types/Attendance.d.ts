import { DateValue } from "@heroui/react";

interface IAttendance {
  _id?: string;
  fullName?: string;
  className?: string;
  attendance?: {
    date: string;
    status: string;
    description: string;
  };
}

interface IAttendanceForm extends IAttendance {
  date?: string | DateValue;
  status?: string;
  description?: string;
}

export type { IAttendance, IAttendanceForm };
