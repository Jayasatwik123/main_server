import catchasyncErrors from "../middlewarre/catchAsyncErrors.js";
import Stripe from "stripe";
const stripe=Stripe("sk_test_51NGh3jSDzkzgjsA6yp6SkPmuCvvA6h1So7U6NgiPV3T5hhXGEqVeFQYnJjPgNk1zW8LBRbEdmTdVGTXZ2Pi4BV6W00rPrWZNPN")


export const processPayment = catchasyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

export const sendStripeApiKey = catchasyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: "pk_test_51NGh3jSDzkzgjsA63fviRp9OpZIimN243xOo1IJUZdHR6PG47n91AGJ9GmPT1DzwSH1meC3W5UKazxQsVSUnRi5k00qgabZVBA" });
});