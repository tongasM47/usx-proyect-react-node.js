const express = require('express');
const Product = require('../models/Product'); // Modelo de productos
const router = express.Router();

// Endpoint para obtener categorías únicas
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        const categories = [...new Set(products.map(product => product.category))];
        const categoryList = categories.map((category, index) => ({
            id: index + 1,
            name: category,
            image: 'https://via.placeholder.com/100', // Imagen predeterminada
        }));
        res.json(categoryList);
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        res.status(500).json({ message: 'Error al obtener las categorías' });
    }
});

module.exports = router;
