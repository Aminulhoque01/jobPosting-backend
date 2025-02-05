import { TClientForm } from "./client.interface";
import { ClientFormModel } from "./client.model"


const createClintFromDB = async (payload : TClientForm) => {
    const result = await ClientFormModel.create(payload);
    if (!result) {
        throw new Error("Client Is not Created");
    }
    return result
}

const updateClientFromDB = async (id : string , payload : Partial<TClientForm>) => {
    const result = await ClientFormModel.findByIdAndUpdate(id, payload, {new : true})
    if (!result) {
        throw new Error("Client Update Unsuccessful");
    }
    return result
} 


const getAllClientFromDB =async () => {
    const result = await ClientFormModel.find({})
    if (!result) {
        throw new Error("No Client Found!");
    }
    return result
}


const deleteClientFromDB = async (id : string) => {
    const result = await ClientFormModel.findByIdAndDelete(id)
    if (!result) {
        throw new Error("Delete Unsuccessful")
    }
    return result
}
export const clientService = {
    createClintFromDB,
    updateClientFromDB,
    getAllClientFromDB,
    deleteClientFromDB
}
