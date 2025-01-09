import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Crear el contexto
const CartContext = createContext();

// Reducer para manejar acciones del carrito
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            // Verificar si el producto ya está en el carrito
            const existingProduct = state.find(item => item.id === action.payload.id);
            if (existingProduct) {
                return state.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + action.payload.quantity }
                        : item
                );
            }
            return [...state, action.payload];

        case 'REMOVE_FROM_CART':
            return state.filter(item => item.id !== action.payload.id);

        case 'UPDATE_QUANTITY':
            return state.map(item =>
                item.id === action.payload.id
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );

        case 'CLEAR_CART':
            return [];

        default:
            return state;
    }
};

// Proveedor del contexto
export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, [], () => {
        const localData = localStorage.getItem('cart');
        return localData ? JSON.parse(localData) : [];
    });

    // Sincronizar con localStorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook para usar el contexto del carrito
export const useCart = () => useContext(CartContext);
