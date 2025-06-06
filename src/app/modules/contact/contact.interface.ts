import { Model } from 'mongoose';
import { PaginateOptions, PaginateResult } from '../../../types/paginate';

export interface IContact {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export interface IContactModal extends Model<IContact> {
  paginate(
    filters: object,
    options: PaginateOptions
  ): Promise<PaginateResult<IContact>>;
}
