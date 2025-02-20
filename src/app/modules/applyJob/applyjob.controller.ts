import { Request, Response, NextFunction } from "express";
import catchAsync from "../../../shared/catchAsync";
import { send } from "process";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { JobApplicationService } from "./applyjob.service";
import { User } from "../user/user.model";
import { JobApplication } from "./applyjob.model";



// const applyJob = catchAsync(async (req: Request, res: Response) => {
//     const { ...allyData } = req.body;
//     console.log('Form Data:', allyData);

//     // Capture the uploaded file
//     if (req.file) {
//         allyData.resume = req.file.filename; // Store file name or full path
//     }
//     if (req.file) {
//         allyData.coverLetter = req.file.filename; // Store file name or full path
//     }

//     const userId = req.user.id;
//     const jobApplication = await JobApplicationService.applyForJob(allyData, userId);


//     sendResponse(res, {
//         code: StatusCodes.OK,
//         message: 'Job application submitted successfully.',
//         data: {
//             jobApplication
//         },
//     });
// });



const applyJob = catchAsync(async (req: Request, res: Response) => {
    const { ...allyData } = req.body;
    console.log('Form Data:', allyData);
    console.log('Uploaded Files:', req.files); // Debugging

    // Capture the uploaded files
    if (req.files) {
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        allyData.resume = files.resume?.[0]?.filename || null;
        allyData.coverLetter = files.coverLetter?.[0]?.filename || null;
    }

    const userId = req.user.id;
    const jobApplication = await JobApplicationService.applyForJob(allyData, userId);

    sendResponse(res, {
        code: StatusCodes.OK,
        message: 'Job application submitted successfully.',
        data: { jobApplication },
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

// find all applied user 

const jobAppliedUser = catchAsync(async(req:Request, res:Response)=>{
    const applicants = await JobApplicationService.getAllApplicants();

    return sendResponse(res, {
        code: StatusCodes.OK,
        message: 'get all applied candidate successfully.',
        data: applicants,
    });
});


// shortlist user 

const shortlistUser = catchAsync(async(req:Request, res:Response)=>{
    const id = req.params.id;

    const shortlist = await JobApplicationService.shortlistUser(id);

    return sendResponse(res, {
        code: StatusCodes.OK,
        message: 'get all applied candidate successfully.',
        data: shortlist,
    });
});

//reject user
const creteReject = catchAsync(async(req:Request, res:Response)=>{
    const id = req.params.id;

    const shortlist = await JobApplicationService.creteReject(id);

    return sendResponse(res, {
        code: StatusCodes.OK,
        message: 'application reject successfully.',
        data: shortlist,
    });
});


const getShortlist = catchAsync (async(req:Request, res:Response)=>{
    const result = await JobApplicationService.getShortlist();

    return sendResponse(res, {
        code: StatusCodes.OK,
        message: 'get all shortlist candidate successfully.',
        data: result,
    });
});

const totalShorlistUser = catchAsync(async(req:Request, res:Response)=>{
    const result= await JobApplicationService.totalShorlistUser();

    return sendResponse(res, {
        code: StatusCodes.OK,
        message: 'total shortlist candidate successfully.',
        data: result,
    });
})


const recentApplyedJob = catchAsync(async(req:Request, res:Response)=>{
    const recentApplied= await JobApplicationService.recentAppliedJob();

    sendResponse(res,{
        code: StatusCodes.OK,
        message: 'get all recent applied user successfully.',
        data: recentApplied,
    })
});


// total 

const totalApplication =  catchAsync(async(req:Request, res:Response)=>{
    const total = await JobApplicationService.totalAplicaiton();

    sendResponse(res,{
        code: StatusCodes.OK,
        message: 'total applicaiton successfully.',
        data: total, 
    })
})

export const applyJobController = {
    applyJob,
    getUserAppliedJobs,
    recentApplyedJob,
    totalApplication,
    jobAppliedUser,
    shortlistUser,
    getShortlist,
    totalShorlistUser,
    creteReject

}