const cartService = require('../services/cartService');

const addToCart = async (req, res) => {
    try {
        // ID para pruebas
        const userId = 1; 
        const product = req.body;

        // Condicional para validación 
        if (!product.id || !product.price) {
            return res.status(400).json({ message: 'Datos del producto incompletos' });
        }

        const newItem = await cartService.addProductToCart(userId, product);
        
        res.status(201).json({
            message: 'Producto agregado al carrito con exito',
            item: newItem
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addToCart };