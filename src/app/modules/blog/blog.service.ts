import { IBlog } from "./blog.interface";
import { BlogModel } from "./blog.model";

const createBlog = async(blogData:IBlog,)=>{
    return await BlogModel.create(blogData);
};

const getAllBlog=async()=>{
    return await BlogModel.find();
};

const getSingleBlog=async(id:string)=>{
    const result= await BlogModel.findById(id);

    return result;
};

const updateBlog = async(id:string, updatedData:Partial<IBlog>)=>{

    const result= await BlogModel.findByIdAndUpdate(id, updatedData ,{new:true});
    return result;
};

const deleteBlog = async(id:string)=>{
    const result = await BlogModel.findByIdAndDelete(id);

    return result;
}

export const BlogService={
    createBlog,
    getAllBlog,
    getSingleBlog,
    updateBlog,
    deleteBlog
}