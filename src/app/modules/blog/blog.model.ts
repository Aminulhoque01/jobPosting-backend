import { model, Schema } from "mongoose";
import { IBlog } from "./blog.interface";

const postSchema = new Schema<IBlog>(
    {
      title: { type: String, },
      content: { type: String,  },
      featureImage: { type: String },
      category: { type: String, },
      tag: { type: String,  },
      status: { type: String, enum: ["Published", "Draft"] }
      
    },
    { timestamps: true }
  );
  
  export const BlogModel = model<IBlog>("Post", postSchema);