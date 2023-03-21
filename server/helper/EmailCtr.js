const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");

module.exports = SendEmail = async (data, req, res) => {
  const { to, subject, text, link } = data;

  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "20244dabf41260",
      pass: "d7cbf6ee467c20",
    },
  });
  // console.log("../");
  // require("../views/send mail/mail.ejs")
  const template = path.join(__dirname, "../views/send mail/mail.ejs");
  const img =
    "https://pms.webcreta.com/files/system/_file61781b45a875c-site-logo.png";
  const htmlejs = await ejs.renderFile(template, { text, link, img });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Hitesh Prajapati" <store.webcreta@gmail.com>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: htmlejs, // html body
  });

  // console.log("Message sent: %s", info.messageId);
  // console.log(data);

  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
