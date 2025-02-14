
import { sendEmail } from '../../../helpers/emailHelper';
import { IContact } from './contact.interface';
import { Contact } from './contact.model';

const createContactToAdmin = async (payload: IContact) => {
  const result = await Contact.create(payload);
  const emailPayload = {
    to: payload.email, // assuming payload has an email property
    subject: 'New Contact Request',
    html: `<p>You have a new contact request from ${payload.firstName}</p>` // customize as needed
  };
  await sendEmail(emailPayload);
  return result;
};

const getMessage= async()=>{
  const result = await Contact.find();
  return result
}

export const ContactService = {
  createContactToAdmin,
  getMessage
};
