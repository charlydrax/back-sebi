require('dotenv').config({ path: './../.env' });

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:'sebilagazelle@gmail.com', // Votre adresse Gmail
    pass: process.env.MDP, // Mot de passe spécifique à l'application (à configurer dans les paramètres Google)
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '" la GaAZeeEElleee " sebilagazelle@gmail.com', // sender address
    to: "charlyplanquette@yahoo.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);