const nodemailer = require("nodemailer");

async function sendEmail({ email, name, phone, message }) {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const smtpServer = process.env.EMAIL_SMTP_SERVER;
  const port = Number(process.env.EMAIL_SERVER_PORT);
  const to = process.env.EMAIL_TO;

  let transporter = nodemailer.createTransport({
    host: smtpServer,
    port: port,
    secure: port === 465 ? true : false,
    auth: {
      user: user,
      pass: pass,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"lucasarvelo.com" <webcontact@lucasarvelo.com>', // sender address
    to: to, // list of receivers
    subject: `lucasarvelo.com Web Form -  ${name}`, // Subject line
    text: `Email: ${email}, name: ${name}, phone: ${phone}, message: ${message}`, // plain text body
    html: `<b>Email: ${email}, name: ${name}, phone: ${phone}, message: ${message}</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  return info;
}

module.exports = sendEmail;
