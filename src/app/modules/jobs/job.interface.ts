import { Model } from "mongoose";
import { PaginateOptions, PaginateResult } from "../../../types/paginate";

export interface IJob {
    title: string;
    salary: string;
    company: string;
    image?: string;
    location: string;
    category: string;
    postedAt: string;
    description: string;
    employmentType: string;
    workPlace:"Onsite" | "Remote";
    experinceLavel:string,
    expirationDate: Date;
    
    createdAt: Date;
    applicants: string[];
    appliedDate:string[]
    
}




export interface JobModal extends Model<IJob> {
  paginate: (
    filter: object,
    options: PaginateOptions
  ) => Promise<PaginateResult<IJob>>;
  isExistJobModelByCompany(company: string): Promise<Partial<IJob> | null>;
  isExistJobModelByLocation(location: string): Promise<Partial<IJob> | null>;
  
}
