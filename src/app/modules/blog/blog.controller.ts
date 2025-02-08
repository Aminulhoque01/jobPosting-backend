
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
    const { id } = req.params;

    if (!id) {
        return sendResponse(res, {
            code: StatusCodes.BAD_REQUEST,
            message: "Blog ID is required.",
            data: null,
        });
    }

    const result = await BlogService.getSingleBlog(id);

    if (!result) {
        return sendResponse(res, {
            code: StatusCodes.NOT_FOUND,
            message: "Blog not found.",
            data: null,
        });
    }

    sendResponse(res, {
        code: StatusCodes.OK,
        message: "Single blog retrieved successfully.",
        data: result,
    });
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id; // Get the blog ID from the route
    const updatedData = req.body; // Contains the form data fields (title, content, etc.)

    console.log("Updated data before update:", updatedData); // Log data to check

    // If a new file (featureImage) is uploaded, add it to updatedData
    if (req.file) {
        updatedData.featureImage = `/uploads/users/${req.file.filename}`; // Save the file name in the featureImage field
    }

    // Call the BlogService to update the blog in the database
    const result = await BlogService.updateBlog(id, updatedData);

    console.log("Updated blog result:", result); // Log the updated result to check what's returned

    // Return the updated data in the response
    sendResponse(res, {
        code: StatusCodes.OK,
        message: 'Blog updated successfully.',
        data: result, // Return the full updated blog data
    });
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