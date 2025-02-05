import { PaginateOptions, PaginateResult } from "../../../types/paginate";
import mongoose from 'mongoose';
import { User } from "../user/user.model";
import { IJob } from "./job.interface";
import { Job } from "./job.model";
import { JobApplication } from "../applyJob/applyjob.model";
// import { JobModel } from "./job.module";

const createJobs = async (jobData: string): Promise<IJob | null> => {
    const result = await Job.create(jobData);

    return result;
    
};

const getAllJobs = async (
    filters: Partial<IJob>,
    options: PaginateOptions
): Promise<PaginateResult<IJob>> => {
    

    // Set default sort order if not provided
    options.sortBy = options.sortBy || '-createdAt';

    // Log sanitized filters and options for debugging
 

    // Fetch data using pagination
    const paginatedJobs = await Job.paginate(filters, options);
    const jobs = paginatedJobs;

    return jobs;
};

const recentJobs = async (): Promise<IJob[]> => {
    const recentJobs = await Job.find().sort({ createdAt: -1 }).limit(5);
    return recentJobs;
}

const getSingleJob = async (jobId: string): Promise<IJob | null> => {
    const job = await Job.findById(jobId);
    return job;
};

const updateJob = async (jobId: string, jobData: Partial<IJob>) => {
    const job = await Job.findByIdAndUpdate(jobId, jobData, {
        new: true, // Return the updated document
        runValidators: true, // Ensure validation rules are applied
    });
    return job;
};

const deleteJob = async (jobId: string) => {
    const job = await Job.findByIdAndDelete(jobId);
    return job;
};

const applyForJob = async (jobId: string, userId: string): Promise<IJob | null> => {
    const job = await Job.findById(jobId).populate('applicants', 'name email role');
    // const job = await Job.findById(jobId);
    if (!job) {
        return null;
    }
    
    await job.save();
    return job;
};

// save job to user

const saveForJob = async (jobId: string, userId: string) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    // Check if the fullName field exists before updating
   

    if (user.savedJobs.includes(new mongoose.Types.ObjectId(jobId))) {
        throw new Error("Job already saved");
    }

    user.savedJobs.push(new mongoose.Types.ObjectId(jobId));
    await user.save(); // This will fail if fullName is missing
};




const getSavedJobs = async (userId: string) => {
    const user = await User.findById(userId).populate('savedJobs');
    if (!user) {
        throw new Error('User not found');
    }
    return user.savedJobs;
};

const removeSavedJob = async (jobId: string, userId: string) => {
    const user = await User.findById(userId);
    // const job = await Job.findById(jobId);
    if (!user) {
        throw new Error('User not found');
    }
    if (!user.savedJobs.includes(new mongoose.Types.ObjectId(jobId))) {
        throw new Error('your save Job not found');
    }
    user.savedJobs = user.savedJobs.filter(
        savedJobId => savedJobId.toString() !== jobId
    );
    await user.save();
    
}

const getAllApplicants = async()=>{
    const jobs = await JobApplication.find().populate('applicant', 'fullName email profileImage');

    // Collect all applicants (users who have applied for jobs)
    

    return jobs;
}

export const jobService = {
    createJobs,
    getAllJobs,
    getSingleJob,
    recentJobs,
    updateJob,
    applyForJob,
    saveForJob,
    getSavedJobs,
    removeSavedJob,
    deleteJob,
    getAllApplicants
}