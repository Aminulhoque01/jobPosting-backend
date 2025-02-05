import { TTreatment } from "./treatment.interface";
import { TreatmentModel } from "./treatment.model";


const createTreatmentIntoDB = async(payload : TTreatment) => {
    const result = await TreatmentModel.create(payload);
    if (!result) {
        throw new Error("Treatment not create successfully");
    }
    return result
}

const updateTreatmentFromDB = async (id : string , payload : Partial<TTreatment>) => {
    const result = await TreatmentModel.findByIdAndUpdate(id , payload, {new : true})
    if (!result) {
        throw new Error("Treatment Update Failled");
    }
    return result
}

const getAllTreatmentFromDB = async  () => {
    const result = await TreatmentModel.find({});
    if (!result) {
        throw new Error("No Treatment Found");
    }
    return result
} 

const deleteOneTreatmentFromDB = async (id : string) => {
    const result = await TreatmentModel.findByIdAndDelete(id);
    if (!result) {
        throw new Error("This Treatment is Not Deleted");
    }
    return result
}


export const treatmentSearvice = {
    createTreatmentIntoDB,
    updateTreatmentFromDB,
    getAllTreatmentFromDB,
    deleteOneTreatmentFromDB
}