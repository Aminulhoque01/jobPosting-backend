import { StatusCodes } from 'http-status-codes';
import { PaginateOptions, PaginateResult } from '../../../types/paginate';
import { INotification } from './notification.interface';
import { Notification } from './notification.model';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';

const getAdminNotifications = async () => {
  return await Notification.find({ isRead: false }).populate({
    path: 'user',  // Populate user details
    select: 'fullName profileImage', // Select only necessary fields
  })
   
}

const markAsRead = async (notificationId: string) => {
  return await Notification.findByIdAndUpdate(notificationId, { isRead: true }, { new: true });
}

const addNotification = async (
  payload: INotification
): Promise<INotification> => {
  // Save the notification to the database
  const result = await Notification.create(payload);
  return result;
};

const getALLNotification = async (
  filters: Partial<INotification>,
  options: PaginateOptions,
  userId: string
) => {
  userId;
  const unViewNotificationCount = await Notification.countDocuments({
    receiverId: userId,
    viewStatus: false,
  });

  const result = await Notification.paginate(filters, options);
  return { ...result, unViewNotificationCount };
};


const getSingleNotification = async (
  notificationId: string
): Promise<INotification | null> => {
  const result = await Notification.findById(notificationId);
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Notification not found');
  }
  return result;
};




const viewNotification = async (notificationId: string) => {
  const result = await Notification.findByIdAndUpdate(
    notificationId,
    { viewStatus: true },
    { new: true }
  );
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Notification not found');
  }
  return result;
};

const deleteNotification = async (notificationId: string) => {
  const result = await Notification.findByIdAndDelete(notificationId);
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Notification not found');
  }
  return result;
};

const clearAllNotification = async (userId: string) => {
  const user = await User.findById(userId);
  if (user?.role === 'admin') {
    const result = await Notification.deleteMany({ role: 'admin' });
    return result;
  }
  const result = await Notification.deleteMany({ receiverId: userId });
  return result;
};


export const NotificationService = {
  addNotification,
  getALLNotification,
  getAdminNotifications,
  getSingleNotification,

  viewNotification,
  deleteNotification,
  clearAllNotification,
  markAsRead,
};
