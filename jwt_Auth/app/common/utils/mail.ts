import nodemailer from "nodemailer";

export const sendMail = async (
  to: string,
  subject: string,
  html: string,
): Promise<void> => {
  if (!to || typeof to !== "string") {
    throw new Error("No recipients defined");
  }

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Auth App" <${process.env.MAIL_USER}>`,
    to,
    subject,
    html,
  });
};
