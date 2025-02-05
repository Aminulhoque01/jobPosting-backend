import { model, Schema } from "mongoose";
import { TPatient } from "./patient.interface";

const patientSchema: Schema = new Schema<TPatient>(
  {
    clientId: {
      type: Schema.Types.ObjectId, // MongoDB ObjectId type
      ref: "Client", // Reference to the Client model (optional, if you have a Client model)
      required: true,
    },
    areaOfConcern: {
      type: [String], // e.g., ["Neck", "Back"]
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    points: {
      type: [String], // e.g., ["01. Text", "02. Text"]
      required: true,
    },
    image: {
      type: String, // URL or path to uploaded image
      required: false,
    },
  },
  { timestamps: true }
);


export const PatientModel = model<TPatient>("Patient", patientSchema);
