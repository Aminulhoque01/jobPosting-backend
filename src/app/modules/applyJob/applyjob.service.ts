import mongoose from "mongoose";
import { Job } from "../jobs/job.model";
import { User } from "../user/user.model";
import { IJobApplication } from "./applyjob.interface";
import { JobApplication } from "./applyjob.model";
import { request } from "express";
import { TUser } from "../user/user.interface";

const applyForJob = async (applicationData: Partial<IJobApplication>, userId: string): Promise<IJobApplication> => {
    const { jobId, resume } = applicationData;

    const job = await Job.findById(jobId);
    if (!job) {
        throw new Error("Job not found");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    // Create the job application with the applicant (userId)
    const newApplication = await JobApplication.create({
        ...applicationData,
        resume, 
        applicant: userId, // ✅ Ensure the user ID is stored
    });

    // Update user applied jobs
    await User.findByIdAndUpdate(userId, {
        $push: { appliedJobs: jobId },
    });

    // Update job applicants
    await Job.findByIdAndUpdate(jobId, {
        $push: { applicants: userId },
    });

    return newApplication;
};


const getUserApplications = async (userId: string) => {
    return JobApplication.find({ applicant: userId }).populate("jobId");

  
}

export const JobApplicationService = {
    applyForJob,
    getUserApplications
}