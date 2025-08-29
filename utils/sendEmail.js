const transporter = require("../config/nodemailerTransporter")

const sendEmail = (email, name, token) =>{
    transporter.sendMail({
        to: email,
        subject: "Welcome to jumia. click to win $5000",
        from: `Jumia platform`,
         html: `<div>
            <h2>Hello, ${name}</h2>
            <p>Welcome to Jumia, kindly click the link below to verify your account</p>
            <a style="background: blue; padding: .5rem 1rem; border-radius: 8px; color: white; text-decoration: none; text-align: center;"   href="${process.env.clientDomain}/verify/${token}">Verify my Account</a>
        </div>`,
        replyTo: "fagbamilabunmi96@gmail.com",
    }, (err, info)=>{
        if (err) {
            console.log(err)
        }else{
            console.log(`Email sent!`);
            
        }
    })
}

module.exports = sendEmail