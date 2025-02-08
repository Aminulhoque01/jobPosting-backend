import mongoose from "mongoose";

export interface IJobApplication extends Document {
    jobId: mongoose.Schema.Types.ObjectId;
    applicant: mongoose.Schema.Types.ObjectId;
    fullName: string;
    email: string;
    phoneNumber: string;
    experience: number;
    resume: string; // URL or File path
    coverLetter: string;
    whyFitForRole: string;
    createdAt: Date;
    shortlisted:boolean;
    appliedDate:Date
}