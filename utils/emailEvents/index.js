import sendEmails from "../../services/sendEmail.js";
import { EventEmitter } from "events";

const eventEmitter = new EventEmitter();


eventEmitter.on("confrimEmail", async (data) => {
    const { email,token } = data;
    const sending = await sendEmails(email, "Verify Your Email", `<a href="http://localhost:3000/confirmEmail/${token}">Verify your email</a>`);
});


export default eventEmitter;

