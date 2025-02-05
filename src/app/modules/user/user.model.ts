import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { TUser, UserModal } from './user.interface';
import paginate from '../plugins/paginate';
import { roles } from '../../middlewares/roles';

const userSchema = new Schema<TUser, UserModal>(
  {
    fullName: {
      type: String,
      required: [true, 'fullName name is required'], // Custom error message
    },
    email: {
      type: String,
      required: [true, 'Email is required'], // Custom error message
      lowercase: true,
    },
  
    password: {
      type: String,
      required: [true, 'Password is required'], // Custom error message
      select: false,
      minlength: [8, 'Password must be at least 8 characters long'], // Custom error message for minlength
    },
    phoneNumber:{
      type:String
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "admin"
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: [true, 'Deleted status is required'], // Custom error message
    },
    isBlocked: {
      type: Boolean,
      default: false,
      required: [true, 'Blocked status is required'], // Custom error message
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
      required: [true, 'Email verification status is required'], // Custom error message
    },
    isResetPassword: {
      type: Boolean,
      default: false,
      required: [true, 'Reset password status is required'], // Custom error message
    },
    oneTimeCode: {
      type: String,
      default: null,
      required: [false, 'One-time code is optional'],
    },
    oneTimeCodeExpire: {
      type: Date,
      default: null,
      required: [false, 'One-time code expiry is optional'],
    },
    otpCountDown: {
      type: Number,
      default: null,
      required: [false, 'OTP count down is optional'],
    },
    status: {
      type: String,
      enum: ['Active', 'Blocked', 'Delete'],
      default: 'Active',
    },
    profileImage: {type:String},
    appliedJobs: [{ type: Schema.Types.ObjectId, ref: 'JobApplication' }],
    savedJobs: [{ type: Schema.Types.ObjectId, ref: 'JobModel' }],
    
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


// Apply the paginate plugin
userSchema.plugin(paginate);

// Static methods
userSchema.statics.isExistUserById = async function (id: string) {
  return await this.findById(id);
};

userSchema.statics.isExistUserByEmail = async function (email: string) {
  return await this.findOne({ email });
};

userSchema.statics.isMatchPassword = async function (
  password: string,
  hashPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashPassword);
};

// Middleware to hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcrypt.saltRounds)
    );
  }
  next();
});

// Create and export the User model
export const User = model<TUser, UserModal>('User', userSchema);
