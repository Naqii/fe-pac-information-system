interface IAttendance {
  _id?: string;
  fullName?: string;
  className?: string;
  attendance?: [
    {
      date: string;
      status: string;
      description: string;
    },
  ];
}

export type { IAttendance };
