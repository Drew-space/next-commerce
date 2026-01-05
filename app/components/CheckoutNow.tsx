// "use client";

// import { Button } from "@/components/ui/button";
// import { urlFor } from "@/lib/sanity";
// import { useShoppingCart } from "use-shopping-cart";
// import { ProductCart } from "./AddToBag";

// const CheckoutNow = ({
//   currency,
//   description,
//   image,
//   name,
//   price,
//   price_id,
// }: ProductCart) => {
//   const { checkoutSingleItem } = useShoppingCart();

//   const buyNow = (priceId: string) => {
//     checkoutSingleItem(priceId);
//   };

//   const product = {
//     name: name,
//     description: description,
//     price: price,
//     currency: currency,
//     image: urlFor(image).url(),
//     price_id: price_id,
//   };

//   return (
//     <Button
//       onClick={() => {
//         buyNow(product.price_id);
//       }}
//     >
//       Add To Bag
//     </Button>
//   );
// };

// export default CheckoutNow;

"use client";

import { Button } from "@/components/ui/button";

const CheckoutNow = ({ price_id }: { price_id: string }) => {
  async function buyNow() {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [{ price_id, quantity: 1 }],
      }),
    });

    const data = await res.json();
    if (data.url) window.location.href = data.url;
  }

  return <Button onClick={buyNow}>Buy Now</Button>;
};

export default CheckoutNow;
