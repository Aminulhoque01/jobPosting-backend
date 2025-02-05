import z from 'zod'

// Zod Validation Schema
const ClientFormValidationSchema = z.object({
    body : z.object({
        name: z.string(),
    address: z.object({
      city: z.string(),
      state: z.string(),
      zip: z.string(),
    }),
    phoneNumber: z.string(),
    email: z.string().email('Invalid email format'),
    other: z.string().optional(),
    selectedAnimal: z.string().optional(),
    })
  });


  const UpdateClientFormValidationSchema = z.object({
   body : z.object({
    name: z.string().optional(),
    address: z.object({
      city: z.string().optional(),
      state: z.string().optional(),
      zip: z
        .string()
        .optional(),
    }).optional(),
    phoneNumber: z.string().optional(),
    email: z.string().email('Invalid email format').optional(),
    other: z.string().optional(),
    selectedAnimal: z.string().optional(),
   })
  });
  
  
  // Export Validation Function
  export const clientValidation = {
    ClientFormValidationSchema,
    UpdateClientFormValidationSchema
  };