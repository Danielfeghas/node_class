const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASS
    }
})

transporter.verify((err, success)=>{
    if (!success) {
        console.log(err);
        
    }else{
        console.log("Node mailer is ready to send email!");
        
    }
})


module.exports = transporter