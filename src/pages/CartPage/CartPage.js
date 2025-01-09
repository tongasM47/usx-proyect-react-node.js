import React from 'react';
import { useCart } from '../../context/CartContext'; // Importar el contexto del carrito
import './CartPage.css'; // Importar los estilos

const CartPage = () => {
    const { cart, dispatch } = useCart(); // Obtener el carrito y el dispatch desde el contexto

    // Función para calcular el subtotal
    const calculateSubtotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className="cart-page">
            <h1>Carrito de Compras</h1>
            {cart.length === 0 ? (
                <p>Tu carrito está vacío.</p>
            ) : (
                <>
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th>Total</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(item => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            min="1"
                                            onChange={(e) =>
                                                dispatch({
                                                    type: 'UPDATE_QUANTITY',
                                                    payload: {
                                                        id: item.id,
                                                        quantity: parseInt(e.target.value, 10),
                                                    },
                                                })
                                            }
                                        />
                                    </td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                dispatch({
                                                    type: 'REMOVE_FROM_CART',
                                                    payload: { id: item.id },
                                                })
                                            }
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="cart-summary">
                        <h2>Resumen del Carrito</h2>
                        <p>Subtotal: ${calculateSubtotal().toFixed(2)}</p>
                        <p>Impuestos: ${(calculateSubtotal() * 0.15).toFixed(2)}</p>
                        <p>
                            <strong>Total: ${(calculateSubtotal() * 1.15).toFixed(2)}</strong>
                        </p>
                        <button className="checkout-button">Proceder al Pago</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
