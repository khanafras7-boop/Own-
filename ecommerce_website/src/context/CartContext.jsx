import { createContext, useContext, useState } from "react";
import { getProductById } from "../data/products";

export const CartContext = createContext(null);

export default function CartProvider({children}) {
   const [cartItems, setCartItems] = useState([]);

   function addToCart(id) {
        const numericId = Number(id);
        const product = getProductById(numericId);

        if (!product) return;

        setCartItems((currentItems) => {
            const existing = currentItems.find((item) => item.id === numericId);

            if (existing) {
                return currentItems.map((item) =>
                    item.id === numericId ? { ...item, quantity: item.quantity + 1 } : item
                );
            }

            return [...currentItems, { id: numericId, quantity: 1 }];
        });
   }

   function getCartItemsWithProducts() {
    return cartItems.map((item) => ({
        ...item,
        product : getProductById(item.id)
    })).filter(item => item.product)
   }


    return (
        <CartContext.Provider value={{cartItems, addToCart, getCartItemsWithProducts}}>{children}</CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext);
    return context
}
