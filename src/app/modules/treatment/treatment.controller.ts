import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { treatmentSearvice } from "./treatment.service";

const createTreatment = catchAsync(async (req, res) => {
    const payload = req.body;
    const result = await treatmentSearvice.createTreatmentIntoDB(payload);
    if (!result) {
        throw new Error("Treatment Not Created!");
    }
    return sendResponse(res, {
        code: StatusCodes.OK,
        message:
          'Treatment Created Successfuly',
        data: result,
      });
})

const updateTreatment = catchAsync(async (req, res) => {
    const payload = req.body;
    const {id} = req.params
    const result = await treatmentSearvice.updateTreatmentFromDB(id, payload);
    if (!result) {
        throw new Error("Update Unsuccessful");
    }
    return sendResponse(res, {
        code: StatusCodes.OK,
        message:
          'Treatment Updated Successfuly',
        data: result,
      });
})

const getAllTreatment = catchAsync(async (req, res) => {
    const result = await treatmentSearvice.getAllTreatmentFromDB()
    if (!result) {
        throw new Error("No Treatment Found");
    }
    return sendResponse(res, {
        code: StatusCodes.OK,
        message:
          'Retreve All Treatment Successfuly',
        data: result,
      });
})

const deleteOneTreatmnet = catchAsync(async (req , res) => {
    const {id} = req.params
    const result = await treatmentSearvice.deleteOneTreatmentFromDB(id)
    if (!result) {
        throw new Error("Treatment Not Deleted Successfuly");
    }
    return sendResponse(res, {
        code: StatusCodes.OK,
        message:
          'Treatment deleted Successfuly',
        data: result,
      });
})

export const treatmentController = {
    createTreatment,
    updateTreatment,
    getAllTreatment,
    deleteOneTreatmnet
}