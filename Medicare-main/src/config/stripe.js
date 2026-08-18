// src/stripe.js
import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "your_stripe_publishable_key"
);
