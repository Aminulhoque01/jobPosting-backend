import  { model, Schema } from "mongoose";
import { TTreatment } from "./treatment.interface";

// Mongoose Schema
const TreatmentSchema: Schema = new Schema<TTreatment>({
    treatmentTitle: {
      type: String,
      required: [true, 'Treatment title is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
  });

  export const TreatmentModel = model<TTreatment>('Treatment', TreatmentSchema);