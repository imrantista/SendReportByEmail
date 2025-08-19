import nodemailer from "nodemailer";
export async function sendEmail({ emailHtml, subject }) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "mostafa.imran@vivasoftltd.com",
      pass: "egkpmgdnbbgyxhjj",
    },
  });

  const mailOptions = {
    from: '"GM Imran" <mostafa.imran@vivasoftltd.com>',
    to: "imran.cse04@gmail.com",
    subject: subject,
    html: emailHtml,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
    throw error;
  }
}
