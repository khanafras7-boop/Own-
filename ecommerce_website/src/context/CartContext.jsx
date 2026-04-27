import { createContext, useContext, useState } from "react";
import { getProductById } from "../data/products";
import { useAuth } from "./AuthContext";
import {useNavigate} from 'react-router-dom'
export const CartContext = createContext(null);

export default function CartProvider({children}) {
   const [cartItems, setCartItems] = useState([]);

   const {user} = useAuth();

   const navigate = useNavigate();

   function clearCart() {
    setCartItems([])
   }

   function addToCart(id) {
        const numericId = Number(id);
        const product = getProductById(numericId);

        if (!product) return;

        if(!user) {
            navigate ("/auth");
            return;
        } 

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

    function removeFromCart(id) {
        setCartItems(cartItems.filter((item) => item.id != id))
    }

   function updateQuantity(id, quantity) {
    if(quantity <= 0) {
        removeFromCart(id);
        return;
    }
    setCartItems(
        cartItems.map((item) => item.id === id ? {...item, quantity} : item)
    )
   }

   function getCartTotal() {
    const total = cartItems.reduce((total, item) => {
        const product = getProductById(item.id);
        return total + (product ? product.price * item.quantity : 0);
    }, 0)

    return total;
   }

    return (
        <CartContext.Provider value={{cartItems, clearCart, getCartTotal, addToCart, removeFromCart, getCartItemsWithProducts, updateQuantity}}>{children}</CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext);
    return context
}
