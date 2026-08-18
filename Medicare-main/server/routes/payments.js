import express from "express";
import stripe from "../config/stripe.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Create payment intent
router.post("/create-payment-intent", async (req, res) => {
  try {
    const { doctorId, appointmentData } = req.body;

    // For demo purposes, we'll use a fixed fee
    const consultationFee = appointmentData.fee || 800;

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: consultationFee * 100, // Amount in paise (multiply by 100 for rupees to paise)
      currency: "inr",
      metadata: {
        doctorId: doctorId,
        patientId: appointmentData.patientId || "demo-patient",
        appointmentDate: appointmentData.appointmentDate,
        appointmentTime: appointmentData.appointmentTime,
        consultationType: appointmentData.consultationType,
      },
      description: `Consultation appointment`,
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      amount: consultationFee,
    });
  } catch (error) {
    console.error("Payment intent creation error:", error);
    res
      .status(500)
      .json({ message: "Payment setup failed", error: error.message });
  }
});

// Confirm payment and create appointment
router.post("/confirm-payment", async (req, res) => {
  try {
    const { paymentIntentId, appointmentData } = req.body;

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    // For demo purposes, we'll just return success
    // In a real app, you would save the appointment to your database
    console.log("Appointment created:", {
      patientId: paymentIntent.metadata.patientId,
      doctorId: paymentIntent.metadata.doctorId,
      appointmentDate: paymentIntent.metadata.appointmentDate,
      appointmentTime: paymentIntent.metadata.appointmentTime,
      type: paymentIntent.metadata.consultationType,
      fee: paymentIntent.amount / 100,
      paymentStatus: "paid",
      paymentIntentId: paymentIntentId,
      status: "confirmed",
    });

    res.json({
      message: "Payment confirmed and appointment created",
      appointmentId: "demo-appointment-" + Date.now(),
    });
  } catch (error) {
    console.error("Payment confirmation error:", error);
    res
      .status(500)
      .json({ message: "Payment confirmation failed", error: error.message });
  }
});

// Handle Stripe webhooks
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log("Payment succeeded:", paymentIntent.id);
        break;
      case "payment_intent.payment_failed":
        const failedPayment = event.data.object;
        console.log("Payment failed:", failedPayment.id);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  }
);

export default router;
