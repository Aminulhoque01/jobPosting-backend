import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { clientService } from "./client.service";


const createClient = catchAsync(async (req, res) => {
    const payload = req.body
    const result = await clientService.createClintFromDB(payload)
    if (!result) {
        throw new Error("Client Not Created");
    }
    return sendResponse(res, {
        code: StatusCodes.OK,
        message:
          'Client Created Successfuly',
        data: result,
      });
})

const updateClient = catchAsync(async (req, res) => {
    const payload = req.body
    const {id} = req.params
    const result = await clientService.updateClientFromDB(id, payload)
    if (!result) {
        throw new Error("Client Not Update");
    }
    return sendResponse(res, {
        code: StatusCodes.OK,
        message:
          'Client Update Successfuly',
        data: result,
      });

})

const getAllClient = catchAsync(async (req, res) => {
    const result = await clientService.getAllClientFromDB()
    if (!result) {
        throw new Error("All client Not retrive");
    }
    return sendResponse(res, {
        code: StatusCodes.OK,
        message:
          'Retrive All Client Successfuly',
        data: result,
      });
})

const deleteClient = catchAsync(async (req, res) => {
    const {id} = req.params
    const result = await clientService.deleteClientFromDB(id)
    if (!result) {
        throw new Error("Delete Unsuccessful")
    }
    return sendResponse(res, {
        code: StatusCodes.OK,
        message:
          'Client Delete Successfuly Done',
        data: result,
      });
})

export const clientController = {
    createClient,
    updateClient,
    getAllClient,
    deleteClient
}