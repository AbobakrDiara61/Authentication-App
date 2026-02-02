import { MailtrapClient } from "mailtrap";
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const TOKEN = process.env.MAILTRAP_TOKEN;

export const client = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "Mohamed Abobakr",
};
const recipients = [
  {
    email: "muhammad.batch61@gmail.com",
  }
];

