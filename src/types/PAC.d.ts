interface IPAC {
  _id?: string;
  pacName?: string;
  slug?: string;
  location?: {
    region: string;
    address: string;
  };
}

interface IPACForm extends IPAC {
  region?: string;
  address?: string;
}

export type { IPAC, IPACForm };
