const axios = require('axios');

const getProducts = async () => {
    try {
        const response = await axios.get(process.env.EXTERNAL_API_URL);
        const products = response.data.products;

        return products.map(p => {
            const offerPrice = p.price;
            const discount = p.discountPercentage;
            // Calculo del precio original convirtiendo a decimal el % de descuento
            const originalPrice = offerPrice / (1 - (discount / 100));

            return {
                id: p.id,
                sku: p.sku,
                thumbnail: p.thumbnail,
                brand: p.brand,
                title: p.title,
                price: offerPrice,
                discountPercentage: discount,
                totalPrice: parseFloat(originalPrice.toFixed(2)) // Uso de solo 2 decimales 
            };
        });
    } catch (error) {
        console.error('Error al obtener productos de la API externa:', error.message);
        throw new Error('No se pudo obtener el catalogo de productos');
    }
};

module.exports = {
    getProducts
};