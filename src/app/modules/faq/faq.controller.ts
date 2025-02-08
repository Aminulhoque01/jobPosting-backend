import { StatusCodes } from 'http-status-codes';
import { Request, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import { createFaq, deleteFaq, getAllFaqs, getFaqById, updateFaq } from './faq.service';

 

 // Adjust to your file structure

export const addFaq = async (req: Request, res: Response) => {
  const { question, answer, } = req.body;

  // Format the date for createdDate (in "DD MMM YYYY" format)
  const createdDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).toUpperCase(); // Example: "08 FEB 2025"

  // Prepare the FAQ object with createdDate included
  const newFaq = { question, answer, createdDate };

  // Save the new FAQ document to the database
  const result = await createFaq(newFaq);

  // Return the response with the created FAQ, including createdDate
  res.status(201).json({
    message: 'FAQ created successfully.',
    data: {
      ...result.toObject(), // Convert the Mongoose document to a plain object
      createdDate,          // Include the formatted createdDate
    },
  });
};




export const getFaqs = async (req: Request, res: Response) => {
    const faqs = await getAllFaqs();
    res.status(200).json({
        message: "FAQs fetched successfully.",
        data: faqs,
    });
};


// Get a single FAQ by ID
export const getFaqSingle = async (req: Request, res: Response) => {
    const faqId = req.params.id;
    const faq = await getFaqById(faqId);

    if (!faq) {
        throw new Error("FAQ not found.");
    }

    res.status(200).json({
        message: "FAQ fetched successfully.",
        data: faq,
    });
};

// Update an existing FAQ
export const editFaq = async (req: Request, res: Response) => {
    const faqId = req.params.id;
    const updatedData = req.body;

    const updatedFaq = await updateFaq(faqId, updatedData);

    res.status(200).json({
        message: "FAQ updated successfully.",
        data: updatedFaq,
    });
};

// Delete an FAQ
export const removeFaq = async (req: Request, res: Response) => {
    const faqId = req.params.id;
    await deleteFaq(faqId);

    res.status(200).json({
        message: "FAQ deleted successfully.",
    });
};