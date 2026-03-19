import api from '../api/api';

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