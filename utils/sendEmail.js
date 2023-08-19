
import nodeMailer from "nodemailer"
const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    port: "8800",
    service:"gmail",
    auth: {
        user: process.env.SMPT_MAIL,
        pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: "jayasatwik1234@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail