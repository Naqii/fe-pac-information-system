import { DateValue } from "@heroui/react";

interface IAttendance {
  _id?: string;
  fullName?: string;
  className?: string;
  attendance?: {
    date: string;
    status: string;
  };
}

interface IAttendanceForm extends IAttendance {
  date?: string | DateValue;
  status?: string;
}

interface RecapResponse {
  daysInMonth: number;
  attendance: StudentRecap[];
}

export type { IAttendance, IAttendanceForm, RecapResponse };
