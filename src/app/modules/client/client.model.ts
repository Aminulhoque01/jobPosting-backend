import  { model, Schema } from "mongoose";
import { TClientForm } from "./client.interface";

// Mongoose Schema
const ClientFormSchema: Schema = new Schema<TClientForm>({
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    address: {
      city: {
        type: String,
        required: [true, 'City is required'],
        trim: true,
      },
      state: {
        type: String,
        required: [true, 'State is required'],
        trim: true,
      },
      zip: {
        type: String,
        required: [true, 'Zip code is required'],
        trim: true,
        match: [/^\d{5}(-\d{4})?$/, 'Invalid zip code format'], // US Zip code format
      },
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'], // E.164 format
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'],
      trim: true,
    },
    other: {
      type: String,
      required: false,
      trim: true,
    },
    selectedAnimal: {
      type: String,
      required: [true, 'Animal selection is required'],
      trim: true,
    },
  });
  
  // Mongoose Model
  export const ClientFormModel = model<TClientForm>('ClientForm', ClientFormSchema);