const cartService = require('../services/cartService');

// Añadir al carrito
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

// Obtener lista de productos del carrito
const getCart = async (req, res) => {
    try {
        const userId = 1; 
        const items = await cartService.getCartContents(userId);
        
        // Notificar en caso el carro este vacio
        if (items.length === 0) {
            return res.status(200).json({ 
                message: 'El carrito está vacío',
                productos: [] 
            });
        }

        res.status(200).json({
            usuario: "Jhon Pietro",
            cantidad_items: items.length,
            productos: items
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addToCart, getCart };