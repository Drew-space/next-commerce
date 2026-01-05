// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
// } from "@/components/ui/sheet";
// import Image from "next/image";

// import { useShoppingCart } from "use-shopping-cart";

// export default function ShoppingCartModal() {
//   const {
//     cartCount,
//     shouldDisplayCart,
//     handleCartClick,
//     cartDetails,
//     removeItem,
//     totalPrice,
//     redirectToCheckout,
//   } = useShoppingCart();

//   async function handleCheckoutClick(event: any) {
//     event.preventDefault();
//     try {
//       const result = await redirectToCheckout();
//       if (result?.error) {
//         console.log("result");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   return (
//     <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
//       <SheetContent className="sm:max-w-lg w-[90vw] px-6">
//         <SheetHeader>
//           <SheetTitle>Shopping Cart</SheetTitle>
//         </SheetHeader>

//         <div className="h-full flex flex-col justify-between">
//           <div className="mt-8 flex-1 overflow-y-auto">
//             <ul className="-my-6 divide-y divide-gray-200">
//               {cartCount === 0 ? (
//                 <h1 className="py-6">You dont have any items</h1>
//               ) : (
//                 <>
//                   {Object.values(cartDetails ?? {}).map((entry) => (
//                     <li key={entry.id} className="flex py-6  ">
//                       <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200 ">
//                         <Image
//                           src={entry.image as string}
//                           alt="Product image"
//                           width={100}
//                           height={100}
//                         />
//                       </div>
//                       <div className="ml-4 flex flex-1 flex-col">
//                         <div>
//                           <div className="flex justify-between text-base font-medium text-gray-900">
//                             <h3>{entry.name} </h3>
//                             <p className="ml-4">${entry.price} </p>
//                           </div>
//                           <p className="mt-1 text-sm text-gray-500 line-clamp-2">
//                             {entry.description}{" "}
//                           </p>
//                         </div>
//                         <div className="flex flex-1 items-end justify-between text-sm">
//                           <p className="text-black font-medium">
//                             {" "}
//                             QTY: {entry.quantity}
//                           </p>
//                           <div className="flex">
//                             <button
//                               type="button"
//                               onClick={() => removeItem(entry.id)}
//                               className="font-medium text-primary hover:text-primary/80"
//                             >
//                               Remove
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </>
//               )}
//             </ul>
//           </div>

//           <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
//             <div className="flex justify-between text-base font-medium text-gray-900">
//               <p>Subtotal:</p>
//               <p>${totalPrice} </p>
//             </div>
//             <p className="mt-0.5 text-sm text-gray-500">
//               {" "}
//               Shipping and taxes are calculated at checkout{" "}
//             </p>
//             <div className="mt-6">
//               <Button onClick={handleCheckoutClick} className="w-full">
//                 Checkout
//               </Button>
//             </div>
//             <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
//               <p>
//                 OR{" "}
//                 <button
//                   onClick={() => handleCartClick()}
//                   className=" font-medium text-primary hover:text-primary/80"
//                 >
//                   Continue Shopping
//                 </button>
//               </p>
//             </div>
//           </div>
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";

import { useState } from "react";
import { useCart } from "../context/cart-context";

export default function ShoppingCartModal() {
  const { items, removeItem } = useCart();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  async function handleCheckoutClick() {
    if (items.length === 0) return;

    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="sm:max-w-lg w-[90vw] px-6">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="h-full flex flex-col justify-between">
          <div className="mt-8 flex-1 overflow-y-auto">
            <ul className="-my-6 divide-y divide-gray-200">
              {cartCount === 0 ? (
                <h1 className="py-6">You dont have any items</h1>
              ) : (
                <>
                  {items.map((entry) => (
                    <li key={entry.id} className="flex py-6">
                      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <Image
                          src={entry.image}
                          alt={entry.name}
                          width={100}
                          height={100}
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{entry.name}</h3>
                            <p className="ml-4">
                              ${entry.price * entry.quantity}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-black font-medium">
                            QTY: {entry.quantity}
                          </p>

                          <button
                            onClick={() => removeItem(entry.id)}
                            className="font-medium text-primary hover:text-primary/80"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal:</p>
              <p>${totalPrice}</p>
            </div>

            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes are calculated at checkout
            </p>

            <div className="mt-6">
              <Button
                onClick={handleCheckoutClick}
                className="w-full"
                disabled={loading}
              >
                {loading ? "Redirecting..." : "Checkout"}
              </Button>
            </div>

            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                OR{" "}
                <button
                  onClick={() => setOpen(false)}
                  className="font-medium text-primary hover:text-primary/80"
                >
                  Continue Shopping
                </button>
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
