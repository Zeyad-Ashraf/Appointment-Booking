import nodemailer from 'nodemailer';

const sendEmails = async (email, subject, html) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SENDER,
            pass:process.env.SENDER_PASS ,
        },
    });

    const info = await transporter.sendMail({
        from: process.env.SENDER, // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        html: html, // html body
    });
}

export default sendEmails;