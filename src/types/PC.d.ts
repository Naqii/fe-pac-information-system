interface IPC {
  _id?: string;
  pcName?: string;
  slug?: string;
  location?: {
    region: string;
    address: string;
  };
  pacList?: {
    pacId: string;
    pacNames: string;
  };
}

interface IPCRegionForm extends IPC {
  region?: string;
  address?: string;
}

interface IPACForm extends IPC {
  pacId?: string;
  pacNames?: string;
}

interface ListPAC {
  pacList: ListPACinPC[];
}

export type { IPC, IPCRegionForm, ListPAC, IPACForm };
