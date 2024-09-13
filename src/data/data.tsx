import { ICompany, IJob } from "../type/type";

function createCompanyData(
  id: number,
  title: string,
  desc: string,
  image: string,
  website: string
): ICompany {
  return { id, title, desc, image, website };
}

function createJobData(
  id: number,
  title: string,
  desc: string,
  technologies: string,
  location: string,
  salary: string,
  phone: string,
  email: string,
  telegram: string,
  instagram: string,
  companyId: number
): IJob {
  return {
    id,
    title,
    desc,
    technologies,
    location,
    salary,
    phone,
    email,
    telegram,
    instagram,
    companyId,
  };
}

export const companyData = [
  createCompanyData(1, "Company1", "lorem ipsum dolor", "image", "website"),
  createCompanyData(2, "Company2", "lorem ipsum dolor", "image", "website"),
  createCompanyData(3, "Company3", "lorem ipsum dolor", "image", "website"),
];
export const jobData = [
  createJobData(
    1,
    "Job1",
    "lorem ipsum dolor",
    "tech1",
    "location1",
    "sal1",
    "+998997654543",
    "email1",
    "tg1",
    "insta1",
    1
  ),
];
