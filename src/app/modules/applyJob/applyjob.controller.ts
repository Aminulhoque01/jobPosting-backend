import { Request, Response, NextFunction } from "express";
import catchAsync from "../../../shared/catchAsync";
import { send } from "process";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { JobApplicationService } from "./applyjob.service";
import { User } from "../user/user.model";
import { JobApplication } from "./applyjob.model";



const applyJob = catchAsync(async (req: Request, res: Response) => {
    const { ...allyData } = req.body;
    console.log('Form Data:', allyData);

    // Capture the uploaded file
    if (req.file) {
        allyData.resume = req.file.filename; // Store file name or full path
    }

    const userId = req.user.id;
    const jobApplication = await JobApplicationService.applyForJob(allyData, userId);


    sendResponse(res, {
        code: StatusCodes.OK,
        message: 'Job application submitted successfully.',
        data: {
            jobApplication
        },
    });
});






const getUserAppliedJobs = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const userId = req.user.id; // Get userId from URL parameters

    if (!userId) {
        throw new Error("User ID is required");
    }

    // Find the job applications of the user and populate job details
    const applications = await JobApplication.find({applicant:userId}).populate("jobId");
    console.log(`asdasdasdasd `,applications);



    console.log(applications);

    sendResponse(res, {
        code: StatusCodes.OK,
        message: "User's applied jobs fetched successfully.",
        data: {
            // totalAppliedJobs,
            applications,
        },
    });
});


export const applyJobController = {
    applyJob,
    getUserAppliedJobs,

}