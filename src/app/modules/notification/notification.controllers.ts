import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { NotificationService } from './notification.services';
import { Request, Response } from 'express';

const getNotification = catchAsync(async (req:Request, res:Response) => {
  const notifications = await NotificationService.getAdminNotifications();
  sendResponse(res, {
    code: StatusCodes.OK,
    data: notifications,
    message: 'Notifications fetched successfully',
  });
})


const marksNotificationRed= catchAsync(async(req:Request, res:Response)=>{
  const { notificationId } = req.params;
  const updatedNotification = await NotificationService.markAsRead(notificationId);

  sendResponse(res, {
    code: StatusCodes.OK,
    data: updatedNotification,
    message: 'Notifications red successfully',
  });

})

const getALLNotification = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['receiverId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const userId = req.user.id;
  const result = await NotificationService.getALLNotification(
    filters,
    options,
    userId
  );
  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'Notifications fetched successfully',
  });
});



const getSingleNotification = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await NotificationService.getSingleNotification(id);
  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'Notification fetched successfully',
  });
});

const viewNotification = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await NotificationService.viewNotification(id);
  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'Notification viewed successfully',
  });
});

const deleteNotification = catchAsync(async (req, res) => {
  const { id } = req.params;
  await NotificationService.deleteNotification(id);
  sendResponse(res, {
    code: StatusCodes.OK,
    message: 'Notification deleted successfully',
    data: {},
  });
});

const clearAllNotification = catchAsync(async (req, res) => {
  const userId = req.user.id;
  await NotificationService.clearAllNotification(userId);
  sendResponse(res, {
    code: StatusCodes.OK,
    message: 'All notifications cleared successfully',
    data: {},
  });
});

export const NotificationController = {
  getALLNotification,
   
  getSingleNotification,
  viewNotification,
  deleteNotification,
  clearAllNotification,
  getNotification,
  marksNotificationRed
};
