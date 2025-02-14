import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ContactService } from './contact.services';
import { Request,Response } from 'express';

const createContactToAdmin = catchAsync(async (req, res, next) => {
  const result = await ContactService.createContactToAdmin(req.body);
  sendResponse(res, {
    code: StatusCodes.CREATED,
    message: 'Contact added successfully',
    data: result,
  });
});

const getMessage = catchAsync(async(req:Request, res:Response)=>{
  const result= await ContactService.getMessage();

  sendResponse(res, {
    code: StatusCodes.CREATED,
    message: 'Contact get successfully',
    data: result,
  });
})

export const ContactController = {
  createContactToAdmin,
  getMessage
};