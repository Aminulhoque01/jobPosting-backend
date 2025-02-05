import { z } from "zod";
import mongoose from "mongoose";

// Helper to validate MongoDB ObjectId
const objectIdValidator = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid MongoDB ObjectId",
  });

 const createPatientSchema = z.object({
  clientId: objectIdValidator, // MongoDB ObjectId for the associated client
  areaOfConcern: z
    .array(z.string())
    .nonempty("Area of concern must have at least one value"), // Non-empty array of strings
  description: z
    .string()
    .min(1, "Description is required"), // Non-empty string
  points: z
    .array(z.string())
    .nonempty("Points must have at least one value"), // Non-empty array of strings
  image: z.string().optional(), // Optional string for image URL or path
});




const updatePatientSchema = z.object({
    clientId: objectIdValidator.optional(), // MongoDB ObjectId for the associated client, now optional
    areaOfConcern: z
      .array(z.string())
      .optional(), // Optional array of strings
    description: z
      .string()
      .optional(), // Optional string
    points: z
      .array(z.string())
      .optional(), // Optional array of strings
    image: z.string().optional(), // Optional string for image URL or path
  });

// TypeScript type inferred from Zod schema
export const patientValidation = {
    createPatientSchema,
    updatePatientSchema
}
