const nodemailer = require("nodemailer");

const sendEmail = async (mailOptions) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.response);
        return true;
    } catch (error) {
        console.error("Error while sending email: ", error);
        return false;
    }
}

module.exports = sendEmail;
