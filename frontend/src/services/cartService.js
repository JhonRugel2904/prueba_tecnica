import api from '../api/api';

// Agrega el producto al carrito
export const addToCart = async (product) => { 
    try {
        const response = await api.post('/cart/add', {
            id: product.id,
            sku: product.sku || 'SKU-000',
            price: product.price
        });
        return response.data;
    } catch (error) {
        console.error("Error al agregar al carrito:", error);
        throw error;
    }
};

// Trae los productos del carrito
export const getCartItems = async () => {
    try {
        const response = await api.get('/cart'); 
        return response.data;
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        throw error;
    }
};

// Elimina un producto especifico del carrito usando el id 
export const removeFromCart = async (idDetalle) => {
    try {
        const response = await api.delete(`/cart/remove/${idDetalle}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar del carrito:", error);
        throw error;
    }
};