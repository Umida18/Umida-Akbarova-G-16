export interface ICompany {
  id: number;
  title: string;
  desc: string;
  image: string;
  website: string;
}
export interface IJob {
  id: number;
  title: string;
  desc: string;
  technologies: string;
  location: string;
  salary: string;
  phone: string;
  email: string;
  telegram: string;
  instagram: string;
  companyId: number;
}
