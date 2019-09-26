const nm = require("nodemailer");

/*
    @desc Async mailer
    @params Mail to send object
    @format: {
        from: `Skótos Account Reset Password <${webmaster}>`,
        to: toReceiver,
        subject: "",
        html: ``
    }
*/

let transporter = nm.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.G_USER,
    pass: process.env.G_PASS
  }
});

module.exports.sender = mailMsg => transporter.sendMail(mailMsg);
