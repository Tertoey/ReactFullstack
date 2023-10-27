const nodemailer = require("nodemailer");
require('dotenv').config()

const sendEmail = async (email,subject,text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.email_host,
            // service: process.env.SERVICE,
            port: 587,
            secure: false,
            auth: {
                user: process.env.email_user,
                pass: process.env.email_pass,
            },
        });
        await transporter.sendMail({
            from: process.env.email_user,
            to: email,
            subject: subject,
            text: text,
            // html: `<h3> Click on this link to verify your email : ${url} </h3>`,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;