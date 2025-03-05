import mongoose from "mongoose";
import { Job } from "../jobs/job.model";
import { User } from "../user/user.model";
import { IJobApplication } from "./applyjob.interface";
import { JobApplication } from "./applyjob.model";
import { request } from "express";
import { TUser } from "../user/user.interface";
import ApiError from "../../../errors/ApiError";
import { Notification } from "../notification/notification.model";


// const applyForJob = async (applicationData: Partial<IJobApplication>, userId: string): Promise<IJobApplication> => {
//     const { jobId, resume, coverLetter } = applicationData;

//     const job = await Job.findById(jobId);
//     if (!job) {
//         throw new Error("Job not found");
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//         throw new Error("User not found");
//     }

//     console.log("Resume Received:", resume); // Debugging
//     console.log("Cover Letter Received:", coverLetter); // Debugging

//     // Create job application
//     const newApplication = await JobApplication.create({
//         ...applicationData,
//         resume, 
//         coverLetter, 
//         applicant: userId, 
//     });

//     return newApplication;
// };



const applyForJob = async (applicationData: Partial<IJobApplication>, userId: string): Promise<IJobApplication> => {
    const { jobId, resume, coverLetter } = applicationData;

    const job = await Job.findById(jobId);
    if (!job) {
        throw new Error("Job not found");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    // console.log("Resume Received:", resume); // Debugging
    // console.log("Cover Letter Received:", coverLetter); // Debugging

    // Create job application
    const newApplication = await JobApplication.create({
        ...applicationData,
        resume, 
        coverLetter, 
        applicant: userId, 
    });

    // ✅ Create a notification
    await Notification.create({
        user: userId,
        job: jobId,
        message: `Applied for the job: ${job.title}`,
        isRead: false,
    });

    return newApplication;
};


const getUserApplications = async (userId: string) => {
    return JobApplication.find({ applicant: userId }).populate("jobId");

  
};


const getAllApplicants = async()=>{
    const jobs = await JobApplication.find().populate('applicant', 'fullName email profileImage').populate("jobId", "title company profileImage");

    // Collect all applicants (users who have applied for jobs)
    

    return jobs;
};


const shortlistUser = async(id:string)=>{
    const application = await JobApplication.findByIdAndUpdate(
        id,
        { shortlisted: true },
        { new: true }
    );

    return application
}

const creteReject = async (id: string) => {
    const application = await JobApplication.findByIdAndUpdate(
        id,
        { status: 'rejected' },  // Update status field to 'rejected'
        { new: true }  // Return the updated document
    );

  

    return application;
};


const getShortlist = async()=>{
    const result = await JobApplication.find({ shortlisted: true }).populate("jobId","title  company");

    return result
}

const recentAppliedJob = async()=>{
    const recentApplications = await JobApplication.aggregate([
        {
            $lookup: {
                from: "jobmodels", // Ensure this matches the collection name
                localField: "jobId",
                foreignField: "_id",
                as: "job"
            }
        },
        {
            $lookup: {
                from: "users", // Ensure this matches the collection name
                localField: "applicant",
                foreignField: "_id",
                as: "user"
            }
        },
        { 
            $unwind: { path: "$job", preserveNullAndEmptyArrays: true } 
        },
        { 
            $unwind: { path: "$user", preserveNullAndEmptyArrays: true } 
        },
        {
            $project: {
                _id: 1,
                jobTitle: "$job.title", // Get the job title
                userName: "$user.fullName", // Get the user name
                profileImage: "$user.profileImage",
                appliedDate: 1
            }
        },
        { 
            $sort: { appliedDate: -1 } // Sort by the latest applied date
        }
    ]);

    console.log("Aggregation Result:", recentApplications);

    return recentApplications
}


const totalAplicaiton = async()=>{
    const totalApplications = await JobApplication.countDocuments();

    return totalApplications
};

const totalShorlistUser = async()=>{

    const result = await JobApplication.countDocuments({ shortlisted: true });

    return result
}

export const JobApplicationService = {
    applyForJob,
    getUserApplications,
    recentAppliedJob,
    totalAplicaiton,
    getAllApplicants,
    shortlistUser,
    getShortlist,
    totalShorlistUser,
    creteReject
}