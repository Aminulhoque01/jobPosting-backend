
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { BlogService } from "./blog.service";
import moment from "moment";
import { IBlog } from "./blog.interface";


const creteBlog = catchAsync(async (req: Request, res: Response) => {
    const { title, content, tag, category } = req.body;
    const featureImage = req.file ? `/uploads/users/${req.file.filename}` : undefined;
    const createdAt = new Date();
    const result = await BlogService.createBlog({ title, content, tag, category, featureImage, createdAt });

    // Format the createdAt field
    const formattedResult = {
        ...result.toObject(),
        createdAtFormatted: moment(result.createdAt).format("MMMM DD, yyyy") // Example: "February 03, 2025"
    };
    
    sendResponse(res, {
        code: StatusCodes.OK,
        message: 'Recent jobs retrieved successfully.',
        data: formattedResult,
    })
});

const getAllBlog = catchAsync(async (req: Request, res: Response) => {
    const result = await BlogService.getAllBlog();

    sendResponse(res, {
        code: StatusCodes.OK,
        message: 'Recent jobs retrieved successfully.',
        data: result,
    })
});

const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await BlogService.getSingleBlog(id);

    sendResponse(res, {
        code: StatusCodes.OK,
        message: 'single job retrieved successfully.',
        data: result,
    })
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const { updatedData } = req.body;
    const result = await BlogService.updateBlog(id, updatedData);
    console.log(result)
    sendResponse(res, {
        code: StatusCodes.OK,
        message: ' jobs updated successfully.',
        data: result,
    })
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await BlogService.deleteBlog(id);

    sendResponse(res, {
        code: StatusCodes.OK,
        message: ' jobs deleted successfully.',
        data: result,
    })
});


export const BlogController = {
    creteBlog,
    getAllBlog,
    getSingleBlog,
    updateBlog,
    deleteBlog
}