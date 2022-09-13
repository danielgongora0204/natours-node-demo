import nodemailer from 'nodemailer';
import {
  emailUser,
  emailPassword,
  emailHost,
  emailPort,
  emailDummy
} from '../constants/email';

export default (options) =>
  Promise.resolve(
    nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      auth: {
        user: emailUser,
        pass: emailPassword
      }
    })
  ).then((transporter) =>
    transporter.sendMail({
      from: emailDummy,
      to: options.email,
      subject: options.subject,
      text: options.message
      // html: options.html
    })
  );

/* In case you want to user gmail - irl bad idea, only allows about 500 emails per day, not ideal for production environment
{
    service: 'Gmail',
    auth: {
      user: emailUser,
      pass: emailPassword
    }
    //Less Secure app enabled on gmail account
  }*/
