import express from "express"

import { processPayment,sendStripeApiKey } from "../controllers/paymentController.js";
import { isAuthenticatedUser } from "../middlewarre/auth.js";
const payment = express();


payment.post("/payment/process", isAuthenticatedUser,processPayment);

payment.get("/stripeapikey",isAuthenticatedUser,sendStripeApiKey);

export default payment;