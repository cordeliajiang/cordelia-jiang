const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const serverless = require('serverless-http');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASS
  }
});

contactEmail.verify((error) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Ready to send emails!");
  }
});

app.post("/api/contact", (req, res) => {
  const { fullName, email, message } = req.body;

  const mail = {
    from: fullName,
    to: process.env.EMAIL_ADDRESS,
    subject: "Contact Form Submission - Portfolio",
    html: `<p>Full Name: ${fullName}</p>
           <p>Email: ${email}</p>
           <p>Message: ${message}</p>`
  };

  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json(error);
    } else {
      res.json({ code: 200, status: "Message Sent" });
    }
  });
});

module.exports.handler = serverless(app);
