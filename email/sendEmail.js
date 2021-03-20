const nodemailer = require('nodemailer');
 async function sendMail ({from, to , subject , text , html}) {
        let transport = nodemailer.createTransport({
                        host:process.env.SMTP_URL,
                        port:process.env.SMTP_PORT,
                        secure: false,
                        auth: {
                                username:process.env.MAIL_USERNAME,
                                password:process.env.MAIL_PASSWORD
                        }
        });
let inform = await transport.sendMail({
        from: `AllShare <${from}>`,
        to,
        subject,
        text,
        html
  });
}

module.exports = sendMail;