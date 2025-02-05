import { ObjectId } from "mongoose";

export type TPatient = {
    clientId: ObjectId; // Unique identifier for the client
    areaOfConcern: string[]; // List of selected areas
    description: string; // Description field
    points: string[]; // List of points added
    image?: string; // Optional uploaded image URL or path
  };
  