const nodemailer = require("nodemailer");

const sendmail = async (options) => {
    //1) Create a transporter
    const transporter = nodemailer.createTransport({
        // service: "gmail", //서비스가 GMAIL일 경우
        host: process.env.TRAP_EMAIL_HOST,
        port: process.env.TRAP_EMAIL_PORT,
        auth: {
            user: process.env.TRAP_EMAIL_USER,
            pass: process.env.TRAP_EMAIL_PASSWORD,
        },
        // Activate in gamil "less secure app" option
    });

    // 2) define te email options
    const mailOptions = {
        from: "Taekyeong <social@admin.io>",
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: `<h2>hi i am here</h2>
        ${options.message}`,
    };

    // 3) Actually send the email
    await transporter.sendMail(mailOptions);
};

module.exports = sendmail;
