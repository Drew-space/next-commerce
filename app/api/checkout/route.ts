// // app/api/checkout/route.ts
// import Stripe from "stripe";
// import { NextResponse } from "next/server";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2023-10-16",
// });

// export async function POST(req: Request) {
//   const { items } = await req.json();

//   if (!items || items.length === 0) {
//     return NextResponse.json({ error: "No items provided" }, { status: 400 });
//   }

//   const session = await stripe.checkout.sessions.create({
//     mode: "payment",
//     payment_method_types: ["card"],
//     line_items: items.map((item: any) => ({
//       price: item.price_id,
//       quantity: item.quantity,
//     })),
//     success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
//     cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/error`,
//   });

//   return NextResponse.json({ sessionId: session.id });
// }

import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  const { items } = await req.json();

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: items.map((item: any) => ({
      price: item.price_id,
      quantity: item.quantity,
    })),
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/error`,
  });

  return NextResponse.json({ url: session.url });
}
