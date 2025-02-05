import mongoose, { Schema } from "mongoose";
import { IJobApplication } from "./applyjob.interface";

const JobApplicationSchema = new Schema<IJobApplication>(
    {
        jobId: { type: Schema.Types.ObjectId, ref: "JobModel", required: true }, // ✅ Ensure this matches the registered model name
        applicant: { type: Schema.Types.ObjectId, ref: "User", required: true },
        fullName: { type: String,  },
        email: { type: String, },
        phoneNumber: { type: String, },
        experience: { type: Number, },
        resume: { type: String,  },
        coverLetter: { type: String, },
        whyFitForRole: { type: String,  },
        appliedDate: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

export const JobApplication = mongoose.model<IJobApplication>("JobApplication", JobApplicationSchema);