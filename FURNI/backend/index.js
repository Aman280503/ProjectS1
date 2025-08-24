/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
require("dotenv").config(); // ✅ Load .env

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // ✅ Safe Stripe init
const port = 5000;

app.use(cors({
  origin: "http://localhost:3000", // ✅ Allow frontend
}));
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { cartItems, customerEmail } = req.body;

    if (!cartItems || !customerEmail) {
      return res.status(400).json({ error: "Missing cart items or email." });
    }

    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.title || "Unknown Item",
          images: item.img_url ? [item.img_url] : [], // ✅ Handle missing image
        },
        unit_amount: Math.round(item.discount_price * 100), // INR = paisa
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["US", "AU", "GB", "DE", "IN"],
      },
      customer_email: customerEmail,
      payment_intent_data: {
        description: "Purchase from MyShop (Export from India)",
      },
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe session creation error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
