<<<<<<< HEAD
const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
=======
const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
>>>>>>> 254fa1f (minor fixes)
    };
  }

  const { name, email, message } = JSON.parse(event.body);

  const transporter = nodemailer.createTransport({
<<<<<<< HEAD
    service: 'gmail',
    auth: {
      user: 'alex.f.youssef@gmail.com', 
      pass: 'wtev adzl tcyz blwm',   
=======
    service: "gmail",
    auth: {
      user: "alex.f.youssef@gmail.com",
      pass: "wtev adzl tcyz blwm",
>>>>>>> 254fa1f (minor fixes)
    },
  });

  const mailOptions = {
    from: email,
<<<<<<< HEAD
    to: 'alex.f.youssef@gmail.com', 
=======
    to: "alex.f.youssef@gmail.com",
>>>>>>> 254fa1f (minor fixes)
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
<<<<<<< HEAD
      body: JSON.stringify({ message: 'Email sent successfully!' }),
=======
      body: JSON.stringify({ message: "Email sent successfully!" }),
>>>>>>> 254fa1f (minor fixes)
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
<<<<<<< HEAD
      body: JSON.stringify({ error: 'Failed to send email', details: error.message }),
    };
  }
};
=======
      body: JSON.stringify({
        error: "Failed to send email",
        details: error.message,
      }),
    };
  }
};
>>>>>>> 254fa1f (minor fixes)
