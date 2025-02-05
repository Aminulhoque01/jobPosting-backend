import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IJob } from "./job.interface";
import { StatusCodes } from "http-status-codes";
import { jobService } from "./job.service";
import pick from "../../../shared/pick";
import { calculateTimeAgo, Job, } from "./job.model";
import { PaginateResult } from "../../../types/paginate";
import { User } from "../user/user.model";
import mongoose from "mongoose";

const createJsob = catchAsync(async (req: Request, res: Response) => {
    const { ...jobData } = req.body;

    const result = await jobService.createJobs(jobData);
    if (!result) {
        throw new Error("no job")
    }
    sendResponse<IJob>(res, {
        code: StatusCodes.OK,
        message: 'Job retrieved successfully',
        data: result,
    })
});


const getAllJobs = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, ["location", "category", "workPlace", "experienceLevel",]);
    const options = pick(req.query, ['sortBy', 'page', 'limit', 'populate']);

    // Set defaults for pagination options
    options.page = options.page || '1';
    options.limit = options.limit || '10';

    const allJobs: PaginateResult<IJob> = await jobService.getAllJobs(filters, options)

    const result = allJobs.results.map(job => ({
        ...job.toObject(),
        posted: calculateTimeAgo(job.createdAt),
    }));

    return sendResponse(res, {
        code: StatusCodes.OK,
        message: 'All jobs retrieved successfully.',
        data: result,


    });
});

const recentJobs = catchAsync(async (req: Request, res: Response) => {
    const recentJobs = await jobService.recentJobs();


    const result = recentJobs.map(job => ({
        ...job.toObject(),
        posted: calculateTimeAgo(job.createdAt),
    }));

    return sendResponse(res, {
        code: StatusCodes.OK,
        message: 'Recent jobs retrieved successfully.',
        data: result,
    });
});

const getSingleJob = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const job = await jobService.getSingleJob(id);
    let posted = null;
    if (job) {
        posted = calculateTimeAgo(job.createdAt);
    }

    return sendResponse(res, {
        code: StatusCodes.OK,
        message: 'Job retrieved successfully.',
        data: {
            ...job.toObject(),
            posted, // Add the "time ago" to the response
        },
    });
});


//update job 

const updateJob = catchAsync(async (req: Request, res: Response) => {
    const  jobId  = req.params.id;
    const jobData = req.body;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return sendResponse(res, {
            code: StatusCodes.BAD_REQUEST,
            message: 'Invalid Job ID',
        });
    }

    const job = await jobService.updateJob(jobId, jobData);

    if (!job) {
        return sendResponse(res, {
            code: StatusCodes.NOT_FOUND,
            message: 'Job not found.',
        });
    }

    return sendResponse(res, {
        code: StatusCodes.OK,
        message: 'Job updated successfully.',
        data: job,
    });
});

// delete job 

const deleteJob = catchAsync(async(req: Request, res: Response) => {
    const {jobId}= req.body;
    const job = await jobService.deleteJob(jobId);

    sendResponse(res, {
        code: StatusCodes.OK,
        message: 'Job deleted successfully.',
        data: job,
    });
})

//apply for job
const applyForJob = catchAsync(async (req: Request, res: Response) => {
    const { jobId } = req.body; // Get jobId from the request
    const userId = req.user.id;

    const job = await Job.findById(jobId);
    const user = await User.findById(userId);
    if( !user) {
        throw new Error(' user not found');
    }
    if( !job) {
        throw new Error(' job not found');
    }
    if (user.appliedJobs.includes(jobId)){
        throw new Error('You have already applied for this job');
    }
    user.appliedJobs.push(jobId);
    job.applicants.push(userId);

    await user.save();
    await job.save();

    const result = await jobService.applyForJob(jobId, userId);
    return sendResponse(res, {
        code: StatusCodes.OK,
        message: 'Job application submitted successfully.',
        data: result,
    });
});

// save for job 

const saveForJob = catchAsync(async (req: Request, res: Response) => {
    const { jobId } = req.body; // Get jobId from the request
    const userId = req.user.id;
    const user = await User.findById(userId);
    const job = await Job.findById(jobId);

    const result = await jobService.saveForJob(jobId, userId);
    console.log(result)
    if (!user) {
        throw new Error('User not found');
    }
    if (!job) {
        throw new Error('Job not found');
    }

    

    sendResponse(res, {
        code: StatusCodes.OK,
        message: 'Job saved successfully.',
        data: result,  
    });
});


// get save job 

const getSavedJobs = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.id;
    const savedJobs = await jobService.getSavedJobs(userId);
    return sendResponse(res, {
        code: StatusCodes.OK,
        message: 'Saved jobs retrieved successfully.',
        data: savedJobs,
    });
});

// remove saved job

const removeSavedJob = catchAsync(async (req: Request, res: Response) => {
    const { jobId } = req.body;
    const userId = req.user.id;
   
   const removeSavedJob= await jobService.removeSavedJob(jobId, userId);
  
    return sendResponse(res, {
        code: StatusCodes.OK,
        message: 'Job removed from saved jobs successfully.',
        data: removeSavedJob,
    });
});


// find all applied user 

const jobAppliedUser = catchAsync(async(req:Request, res:Response)=>{
    const applicants = await jobService.getAllApplicants();

    return sendResponse(res, {
        code: StatusCodes.OK,
        message: 'get all applied candidate successfully.',
        data: applicants,
    });
})




export const jobController = {
    createJsob,
    getAllJobs,
    getSingleJob,
    recentJobs,
    updateJob,
    applyForJob,
    saveForJob,
    getSavedJobs,
    removeSavedJob,
    deleteJob,
    jobAppliedUser
}

