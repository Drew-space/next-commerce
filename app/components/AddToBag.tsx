// "use client";

// import { Button } from "@/components/ui/button";
// import { urlFor } from "@/lib/sanity";
// import { useShoppingCart } from "use-shopping-cart";

// export interface ProductCart {
//   name: string;
//   description: string;
//   price: number;
//   currency: string;
//   image: any;
//   price_id: string;
// }

// const AddToBag = ({
//   currency,
//   description,
//   image,
//   name,
//   price,
//   price_id,
// }: ProductCart) => {
//   const { addItem, handleCartClick } = useShoppingCart();
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
//         (addItem(product), handleCartClick());
//       }}
//     >
//       Add To Bag
//     </Button>
//   );
// };

// export default AddToBag;
"use client";

import { Button } from "@/components/ui/button";
import { urlFor } from "@/lib/sanity";
import { useCart } from "../context/cart-context";

const AddToBag = ({ name, price, image, price_id }: any) => {
  const { addItem, toggleCart } = useCart();

  return (
    <Button
      onClick={() => {
        addItem({
          id: price_id,
          name,
          price,
          image: urlFor(image).url(),
          quantity: 1,
        });
        toggleCart();
      }}
    >
      Add To Bag
    </Button>
  );
};

export default AddToBag;
