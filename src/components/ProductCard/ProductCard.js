import React from 'react';
import './ProductCard.css';
import { useCart } from '../../context/CartContext'; // Importar el contexto del carrito

const ProductCard = ({ product }) => {
    const { dispatch } = useCart(); // Obtener el dispatch del carrito
    const defaultImage = 'https://via.placeholder.com/150'; // Imagen genérica si no hay imagen del producto

    const addToCart = () => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image || defaultImage,
                quantity: 1, // Cantidad inicial
            },
        });
        alert(`${product.name} fue agregado al carrito.`);
    };

    return (
        <div className="product-card">
            <img
                src={product.image || defaultImage}
                alt={product.name}
                className="product-image"
            />
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price.toFixed(2)}</p>
                {product.isOnSale && <span className="product-sale">En Oferta</span>}
                <button className="add-to-cart-button" onClick={addToCart}>
                    Agregar al carrito
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
