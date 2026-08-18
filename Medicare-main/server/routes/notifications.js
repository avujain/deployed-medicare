import express from "express";
import nodemailer from "nodemailer";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Configure nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Send appointment reminder
router.post("/reminder", authenticate, async (req, res) => {
  try {
    const { email, appointmentDetails } = req.body;

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "Appointment Reminder - Medicare Booking",
      html: `
        <h2>Appointment Reminder</h2>
        <p>You have an upcoming appointment:</p>
        <ul>
          <li><strong>Date:</strong> ${appointmentDetails.date}</li>
          <li><strong>Time:</strong> ${appointmentDetails.time}</li>
          <li><strong>Doctor:</strong> ${appointmentDetails.doctor}</li>
          <li><strong>Type:</strong> ${appointmentDetails.type}</li>
        </ul>
        <p>Please make sure to arrive 15 minutes early.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Reminder sent successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to send reminder", error: error.message });
  }
});

export default router;
