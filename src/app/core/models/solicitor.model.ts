export interface Solicitor {
  title: string;
  AuthorisationDate: string;
  SRAID: string;
  Tel: string;
  email: string;
  web: string;
  address: Address;
  branch: string;
  solicitors: string;
  accreditations: Accreditation[];
  area: Area[];
  index?: number;
  legalIssueCategory: {
    parent: string;
    child: string;
  };
}

export interface Address {
  buliding: string;
  town: string;
  postcode: string;
  country: string;
}

export interface Accreditation {
  id: string;
  txt: string;
}

export interface Area {
  id: number;
  name: string;
}

export interface LegalIssueDropdown extends Area {
  parent: string;
}
