const express = require('express');
const Product = require('../models/Product'); // Modelo de productos
const router = express.Router();

// Ruta para agregar un producto
router.post('/add', async (req, res) => {
    try {
        const { name, price, description, category, stock, image } = req.body;

        // Crear un nuevo producto con los datos enviados
        const newProduct = new Product({
            name,
            price,
            description,
            category,
            stock,
            image, // Agregar la imagen si está disponible
        });

        // Guardar el producto en la base de datos
        const savedProduct = await newProduct.save();

        // Responder con el producto creado
        res.status(201).json({ message: 'Producto creado con éxito', product: savedProduct });
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el producto', error });
    }
});

// Ruta para obtener productos destacados
router.get('/featured', async (req, res) => {
    try {
        const featuredProducts = await Product.find().limit(4);
        res.status(200).json(featuredProducts);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos destacados', error });
    }
});

// Ruta para obtener todos los productos o productos por categoría
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;

        const query = category ? { category } : {}; // Filtrar por categoría si se proporciona
        const products = await Product.find(query);

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos', error });
    }
});

// Ruta para obtener un producto por ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto', error });
    }
});

module.exports = router;
