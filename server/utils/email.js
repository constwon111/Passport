const nodemailer = require("nodemailer");

const sendmail = async (options) => {
    //1) Create a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
        // Activate in gamil "less secure app" option
    });

    // 2) define te email options
    const mailOptions = {
        from: "Taekyeong <social@admin.io>",
        to: options.email,
        subject: options.subject,
        text: options.message,
        // html :
    };

    // 3) Actually send the email
    await transporter.sendMail(mailOptions);
};

module.exports = sendmail;
