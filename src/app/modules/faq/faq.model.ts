import { model, Schema } from "mongoose";
import { IFaq } from "./faq.interface";

const faqSchema = new Schema<IFaq>(
    {
        question: { type: String, required: true },
        answer: { type: String, required: true },
        category: { type: String },
        createdDate:{type:String}
    },
    { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Create and export the FAQ model
export const FaqModel = model<IFaq>("Faq", faqSchema);