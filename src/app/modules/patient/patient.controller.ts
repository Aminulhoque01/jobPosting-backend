import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { patientService } from "./patient.service";


const createService = catchAsync(async (req, res) => {
    const payload = req.body;
    const result = await patientService.createserviceFromDB(payload);
    if (!result) {
        throw new Error("Servise Not Created");
    }
    return sendResponse(res, {
        code: StatusCodes.OK,
        message:
          'Service Created Successfuly',
        data: result,
      });
})

const updateService = catchAsync(async (req, res) => {
    const payload = req.body
    const {id} = req.params
    const result  = await patientService.updateserviceFromDB(id, payload);
    if (!result) {
        throw new Error("Update Unsuccessful");
    }
    return sendResponse(res, {
        code: StatusCodes.OK,
        message:
          'Successfuly Updated',
        data: result,
      });
})

const getAllService = catchAsync(async (req, res) => {
    const result = await patientService.getAllServiceFromDB()
    if (!result) {
        throw new Error("No Treatment Avilable Exiest");
    }
    return sendResponse(res, {
        code: StatusCodes.OK,
        message:
          'Successfuly Get All Treatment',
        data: result,
      });
})

const deleteService = catchAsync(async (req, res) => {
    const {id} = req.params
    const result = await patientService.deleteServiceFromDB(id);
    if (!result) {
        throw new Error("service Delete is Unsuccessful!");
    }
    return sendResponse(res, {
        code: StatusCodes.OK,
        message:
          'Successfuly Delete service!',
        data: result,
      });
})

export const patientController = {
    createService,
    updateService,
    getAllService,
    deleteService
} 