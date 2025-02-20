// src/models/job.model.ts
import mongoose, { Schema, model } from 'mongoose';
import { IJob, JobModal } from './job.interface';
import paginate from '../plugins/paginate';







const jobSchema = new Schema<IJob>({
    title: { type: String,  },
    salary: { type: String,  },
    company: { type: String,  },
    image: { type: String,  },
    location: { type: String,  },
    category: { type: String,  },
    description: { type: String,  },
    employmentType: { type: String,  },
    workPlace: { type: String,  },
    experinceLavel: { type: String,  },
    expirationDate: { type: Date },
    createdAt: { type: Date, default: Date.now },
    applicants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    appliedDate: [{ type: Schema.Types.ObjectId, ref: 'JobApplication' }]
   
    
});

// Virtual field for `postedAt`
jobSchema.virtual('postedAt').get(function () {
    return calculateTimeAgo(this.createdAt);
});

jobSchema.pre('save', function (next) {
    if (!this.postedAt) {
        this.postedAt = calculateTimeAgo(this.createdAt || new Date());
    }
    if (!this.expirationDate) {
        this.expirationDate = new Date(this.createdAt.getTime() + 1 * 30 * 24 * 60 * 60 * 1000); // Add 2 months
    }
    next();
});
// Add the `paginate` plugin
jobSchema.plugin(paginate);



// Export the model
export const Job = model<IJob, JobModal>('JobModel', jobSchema);

// Function to calculate "time ago"
export const calculateTimeAgo = (createdAt: Date): string => {
    const now = new Date();
    const diff = now.getTime() - new Date(createdAt).getTime(); // Difference in milliseconds

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
    if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
};


