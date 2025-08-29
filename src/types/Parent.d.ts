interface IParent {
  _id?: string;
  parentName?: string;
  noTlp?: string;
  gender?: string;
  poss?: string;
  location?: {
    region: string;
    address: string;
  };
}

interface IParentForm extends IParent {
  region?: string;
  address?: string;
}

export type { IParent, IParentForm };
