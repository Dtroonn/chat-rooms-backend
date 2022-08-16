const nodemailer = require("nodemailer");

exports.nodemailerTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER_MAIL,
        pass: process.env.USER_MAIL_PASSWORD,
    },
});
