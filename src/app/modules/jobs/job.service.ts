import { PaginateOptions, PaginateResult } from "../../../types/paginate";
import mongoose from 'mongoose';
import { User } from "../user/user.model";
import { IJob } from "./job.interface";
import { Job } from "./job.model";
 





const createJobs = async (jobData: string,): Promise<IJob> => {
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
    const updatedJob = await Job.findByIdAndUpdate(jobId, jobData, { new: true })
    return updatedJob;
};

const deleteJob = async (jobId: string) => {
    const job = await Job.findByIdAndDelete(jobId);
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



const JobApplicationMember = async () => {
    const jobApplications = await Job.aggregate([
        {
            $lookup: {
                from: "jobapplications", // Matches the collection name in MongoDB
                localField: "_id",
                foreignField: "jobId",
                as: "applications"
            }
        },
        {
            $project: {
                _id: 1,
                title: 1,
                applicationCount: { $size: "$applications" } // Count the applications
            }
        }
    ]);

    return jobApplications
};

// total job count 


const totalJob = async () => {
    const total = await Job.countDocuments();

    return total
};

const countJobsByCategory = async () => {
    const total = await Job.aggregate([
        {
            $group: {
                _id: "$category",
                total: { $sum: 1 }
            }
        }
    ]);

    return total
}



export const jobService = {
    createJobs,
    getAllJobs,
    getSingleJob,
    recentJobs,
    updateJob,
    saveForJob,
    getSavedJobs,
    removeSavedJob,
    deleteJob,
    JobApplicationMember,
    totalJob,
    countJobsByCategory

}