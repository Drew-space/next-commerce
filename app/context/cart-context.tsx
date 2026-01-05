// "use client";

// import { createContext, useContext, useState } from "react";

// // export interface CartItem {
// //   id: string; // sanity _id
// //   name: string;
// //   price_id: string;
// //   price: number;
// //   image: string;
// //   quantity: number;
// // }

// export interface CartItem {
//   id: string; // Stripe price_id
//   name: string;
//   price: number;
//   image: string;
//   quantity: number;
// }

// // interface CartContextType {
// //   items: CartItem[];
// //   addItem: (item: CartItem) => void;
// //   removeItem: (id: string) => void;
// //   clearCart: () => void;
// // }

// interface CartContextType {
//   items: CartItem[];
//   addItem: (item: CartItem) => void;
//   removeItem: (id: string) => void;
//   toggleCart: () => void;
//   isOpen: boolean;
// }

// const CartContext = createContext<CartContextType | null>(null);

// export function CartProvider({ children }: { children: React.ReactNode }) {
//   const [items, setItems] = useState<CartItem[]>([]);

//   const addItem = (item: CartItem) => {
//     setItems((prev) => {
//       const existing = prev.find((p) => p.id === item.id);
//       if (existing) {
//         return prev.map((p) =>
//           p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
//         );
//       }
//       return [...prev, { ...item, quantity: 1 }];
//     });
//   };

//   const removeItem = (id: string) => {
//     setItems((prev) => prev.filter((item) => item.id !== id));
//   };

//   const clearCart = () => setItems([]);

//   return (
//     <CartContext.Provider
//       value={{ items, addItem, removeItem, toggleCart, isOpen }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => {
//   const ctx = useContext(CartContext);
//   if (!ctx) throw new Error("useCart must be used inside CartProvider");
//   return ctx;
// };

"use client";

import { createContext, useContext, useState } from "react";

export interface CartItem {
  id: string; // Stripe price_id
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  toggleCart: () => void;
  isOpen: boolean;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);

      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        toggleCart,
        isOpen,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
};
