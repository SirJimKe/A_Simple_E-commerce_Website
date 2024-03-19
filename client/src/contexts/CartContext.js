import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);


    console.log(cartItems);

    const addToCart = (product) => {
        const existingItemIndex = cartItems.findIndex((item) => item.id === product.id);
        const updatedCartItems = [...cartItems];
        if (existingItemIndex !== -1) {
            updatedCartItems[existingItemIndex].quantity += product.quantity;
        } else {
            updatedCartItems.push(product);
        }
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    const removeFromCart = (productId) => {
        const updatedCartItems = cartItems.filter((item) => item.id !== productId);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };

    const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartItemCount }}>
            {children}
        </CartContext.Provider>
    );
};
