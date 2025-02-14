import nodemailer from 'nodemailer';
import config from '../../../config';

const transporter = nodemailer.createTransport({
  host: 'smtp.titan.email',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: config.titan.email,
    pass: config.titan.password,
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  await transporter.sendMail({
    from: `"Horticulture Specialist" <${config.titan.email}>`, // sender address
    to, // recipient address
    subject, // subject line
    html, // email body
  });
};
