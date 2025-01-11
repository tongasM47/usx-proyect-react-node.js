// Obtener categorías únicas desde los productos
const getCategories = async (req, res) => {
    try {
        const products = await Product.find({}); // Obtener todos los productos
        const categories = [...new Set(products.map((product) => product.category))]; // Extraer categorías únicas
        const categoryList = categories.map((category, index) => ({
            id: index + 1,
            name: category,
            image: 'https://via.placeholder.com/100', // Imagen predeterminada
        }));
        res.json(categoryList);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las categorías', error });
    }
};

module.exports = { getCategories };
