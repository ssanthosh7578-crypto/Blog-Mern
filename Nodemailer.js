import nodemailer from "nodemailer"
import dotenv from "dotenv";
import path from "path";
// Try loading Server/.env first (works when starting from project root),
// then fall back to default dotenv behavior.
dotenv.config({ path: path.join(process.cwd(), "Server", ".env") });
dotenv.config();
export const Transporter=nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false, 
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
})