import { model, Schema } from "mongoose";
import { IBlog } from "./blog.interface";

const postSchema = new Schema<IBlog>(
    {
      title: { type: String, required: true },
      content: { type: String, required: true },
      featureImage: { type: String },
      category: { type: String, required: true },
      tag: { type: [String], required: true },
      
    },
    { timestamps: true }
  );
  
  export const BlogModel = model<IBlog>("Post", postSchema);