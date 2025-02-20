import { IBlog } from "./blog.interface";
import { BlogModel } from "./blog.model";

const createBlog = async (blogData: IBlog,) => {
    const result= await BlogModel.create(blogData);
 
    
    return result
}

const getAllBlog = async () => {
    return await BlogModel.find();
};

const getAllPublishedData = async():Promise<IBlog[]>=>{
    const publishedPosts = await BlogModel.find({ status: "Published" });
    return publishedPosts
}
const getAllDraftData = async():Promise<IBlog[]>=>{
    const Draft = await BlogModel.find({ status: "Draft" });
    return Draft
}

const getSingleBlog = async (id: string) => {
    if (!id) return null;

    const result = await BlogModel.findById(id).lean(); // `lean()` converts it to a plain object

    return result;
};

const updateBlog = async (id: string, updatedData: Partial<IBlog>) => {
    const result = await BlogModel.findByIdAndUpdate(id, updatedData, { new: true }); // `new: true` returns the updated document
    return result;
};

const deleteBlog = async (id: string) => {
    const result = await BlogModel.findByIdAndDelete(id);

    return result;
}

export const BlogService = {
    createBlog,
    getAllBlog,
    getSingleBlog,
    updateBlog,
    deleteBlog,
    getAllPublishedData,
    getAllDraftData
}