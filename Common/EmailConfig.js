import nodemailer from "nodemailer";
export async function sendEmail({ emailHtml, subject }) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "********@gamilcom",
      pass: "********",
    },
  });

  const mailOptions = {
    from: '"GM Imran" <"********@gamilcom">',
    to: ""********@gamilcom"",
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
