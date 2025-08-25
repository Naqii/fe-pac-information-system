interface IStudent {
  _id?: string;
  fullName?: string;
  noTlp?: string;
  parentId?: string;
  classId?: string;
  picture?: string | FileList;
}

export type { IStudent };
