import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';
import { User } from './user.model';
import ApiError from '../../../errors/ApiError';
import pick from '../../../shared/pick';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body;
    if (req.file) {
      userData.image = '/uploads/users/' + req.file.filename;
    }
    const isUserExist = await User.findOne({ email: userData?.email });
    if (isUserExist) {
      if (!isUserExist.isEmailVerified) {
        const result = await UserService.isUpdateUser(isUserExist.email);

        return sendResponse(res, {
          code: StatusCodes.OK,
          message:
            'OTP sent to your email, please verify your email within the next 3 minutes.',
          data: result,
        });
      } else {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'User already exists');
      }
    }
    const result = await UserService.createUserToDB(userData);
    if (result.isEmailVerified) {
      return sendResponse(res, {
        code: StatusCodes.OK,
        message: "User's account created successfully.",
        data: result,
      });
    }

    return sendResponse(res, {
      code: StatusCodes.OK,
      message:
        'OTP sent to your email, please verify your email within the next 3 minutes.',
      data: result,
    });
  }
);

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', 'email', 'role', 'fullName']);
  const options = pick(req.query, ['sortBy', 'page', 'limit', 'populate']);
  const users = await UserService.getAllUsersFromDB(filters, options);
  return sendResponse(res, {
    code: StatusCodes.OK,
    message: 'Users retrieved successfully.',
    data: users,
  });
});

const getSingleUserFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.getSingleUserFromDB(id);
  return sendResponse(res, {
    code: StatusCodes.OK,
    message: 'User retrieved successfully.',
    data: result,
  });
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getMyProfile(req.user.id);
  return sendResponse(res, {
    code: StatusCodes.OK,
    message: 'Profile data retrieved successfully.',
    data: result,
  });
});

const fillUpUserDetails = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  if (
    files &&
    'drivingLicenseFront' in files &&
    'drivingLicenseBack' in files
  ) {
    req.body.drivingLicenseFront =
      '/uploads/users/driving_licenses' + files.drivingLicenseFront[0].filename;
    req.body.drivingLicenseBack =
      '/uploads/users/driving_licenses' + files.drivingLicenseBack[0].filename;
  }
  // Call your service with the userId and userData
  const result = await UserService.fillUpUserDetails(userId, req.body);
  return sendResponse(res, {
    code: StatusCodes.OK,
    message: 'User details updated successfully.',
    data: result,
  });
});

// const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
//   const userId = req.user.id;
//   if (req.file) {
//     req.body.profileImage = '/uploads/users/' + req.file.filename;
//   }
//   const result = await UserService.updateMyProfile(userId, req.body);
//   return sendResponse(res, {
//     code: StatusCodes.OK,
//     message: 'User updated successfully.',
//     data: result,
//   });
// });

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  
  // Handle file upload
  if (req.file) {
    req.body.profileImage = '/uploads/users/' + req.file.filename;
  }

  // Update user
  const updatedUser = await UserService.updateMyProfile(userId, req.body);

  if (!updatedUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User update failed!");
  }

  // Send response with the expected structure
  return sendResponse(res, {
    code: StatusCodes.OK,
    message: 'User updated successfully.',
    data: {
      attributes: {
        _id: updatedUser.id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        role: updatedUser.role,
        isDeleted: updatedUser.isDeleted,
        isBlocked: updatedUser.isBlocked,
        isEmailVerified: updatedUser.isEmailVerified,
        isResetPassword: updatedUser.isResetPassword,
        oneTimeCode: updatedUser.oneTimeCode,
        oneTimeCodeExpire: updatedUser.oneTimeCodeExpire,
        otpCountDown: updatedUser.otpCountDown,
        status: updatedUser.status,
        appliedJobs: updatedUser.appliedJobs,
        savedJobs: updatedUser.savedJobs,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
        
        profileImage: updatedUser.profileImage, // Include profileImage here
      },
    },
  });
});




const updateUserImage = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  if (req.file) {
    req.body.profileImage = '/uploads/users/' + req.file.filename;
  }
  const result = await UserService.updateMyProfile(userId, req.body);
  return sendResponse(res, {
    code: StatusCodes.OK,
    message: 'User Image updated successfully.',
    data: result,
  });
});

const changeUserStatus = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { action } = req.body;
  await UserService.changeUserStatus(userId, action);
  return sendResponse(res, {
    code: StatusCodes.OK,
    message: `User ${action}ed successfully.`,
    data: {},
  });
});

const deleteMyProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  await UserService.deleteMyProfile(userId);
  return sendResponse(res, {
    code: StatusCodes.OK,
    message: 'User deleted successfully.',
    data: {},
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  updateUserImage,
  getSingleUserFromDB,
  getMyProfile,
  updateMyProfile,
  fillUpUserDetails,
  deleteMyProfile,
  changeUserStatus,
};
