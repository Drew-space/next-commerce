// "use client";

// import { CartProvider as USCProvider } from "use-shopping-cart";

// const CartProvider = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <USCProvider
//       mode="checkout-session"
//       cartMode="client-only"
//       stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string}
//       successUrl="http://localhost:3000/success"
//       cancelUrl="http://localhost:3000/error"
//       currency="USD"
//       billingAddressCollection={true}
//       shouldPersist={true}
//       language="en-US"
//     >
//       {children}
//     </USCProvider>
//   );
// };

// export default CartProvider;

"use client";

import { CartProvider as USCProvider } from "use-shopping-cart";

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <USCProvider
      mode="payment" // Change this from "checkout-session"
      cartMode="client-only" // Add this line
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string}
      currency="USD"
      successUrl={`${process.env.NEXT_PUBLIC_SITE_URL}/success`}
      cancelUrl={`${process.env.NEXT_PUBLIC_SITE_URL}/error`}
      billingAddressCollection={true}
      shouldPersist
    >
      {children}
    </USCProvider>
  );
};

export default CartProvider;
