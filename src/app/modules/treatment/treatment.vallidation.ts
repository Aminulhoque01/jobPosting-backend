import z, { optional } from 'zod'

// Zod Validation Schema
 const TreatmentValidationSchema = z.object({
   body : z.object({
    treatmentTitle: z
    .string()
    .nonempty('Treatment title is required')
    .trim(),
  price: z
    .number()
    .nonnegative('Price cannot be negative')
    .refine((value) => Number.isFinite(value), 'Price must be a valid number'),
   })
  });
 const UpdateTreatmentValidationSchema = z.object({
    body : z.object({
      treatmentTitle: z
      .string()
      .nonempty('Treatment title is required')
      .trim()
      .optional(),
    price: z
      .number()
      .nonnegative('Price cannot be negative')
      .refine((value) => Number.isFinite(value), 'Price must be a valid number')
      .optional(),
    })
  });


export const treatmentValidation = {
    TreatmentValidationSchema,
    UpdateTreatmentValidationSchema
}

  