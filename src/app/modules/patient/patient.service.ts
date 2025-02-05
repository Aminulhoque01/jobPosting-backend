import { TreatmentModel } from "../treatment/treatment.model";
import { TPatient } from "./patient.interface";
import { PatientModel } from "./patient.model";

const createserviceFromDB = async (payload : TPatient) => {
    const result = await TreatmentModel.create(payload);
    if (!result) {
        throw new Error("Service Not Created");
    }
    return result
}

const updateserviceFromDB = async(id : string , payload : Partial<TPatient>) => {
    const result = await PatientModel.findByIdAndUpdate(id, payload, {new : true})
    if (!result) {
        throw new Error("service Not Updated successfuly");
    }
    return result
}

const getAllServiceFromDB = async () => {
    const result = await PatientModel.find({})
    if (!result) {
        throw new Error("No Treatment Service Avilable");
    }
    return result
}

const deleteServiceFromDB = async (id : string) => {
    const result = await PatientModel.findByIdAndDelete(id)
    if (!result) {
        throw new Error("service Delete is Unsuccessful!");
    }
    return result
}

export const patientService = {
    createserviceFromDB,
    updateserviceFromDB,
    getAllServiceFromDB,
    deleteServiceFromDB
} 