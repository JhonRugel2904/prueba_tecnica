const db = require('../config/db');

/**
 * Gestiona la insercion de productos en el carrito
 * En caso de no existir orden activa, la crea
 */
const addProductToCart = async (userId, product) => {
    //Verificar si existe el carrito
    const cartQuery = 'SELECT id_carrito FROM "order" WHERE id_usuario = $1 LIMIT 1';
    const cartRes = await db.query(cartQuery, [userId]);
    
    let cartId;

    // En caso de no tener carrito lo crea
    if (cartRes.rows.length === 0) {
        const createCartQuery = 'INSERT INTO "order" (id_usuario, total_compra) VALUES ($1, 0) RETURNING id_carrito';
        const newCartRes = await db.query(createCartQuery, [userId]);
        cartId = newCartRes.rows[0].id_carrito;
    } else {
        // Si tiene carrito usa el existente
        cartId = cartRes.rows[0].id_carrito;
    }

    // Se inserta el producto en "order_items"
    const addItemQuery = `
        INSERT INTO order_items (id_carrito, id_producto, sku, precio) 
        VALUES ($1, $2, $3, $4) RETURNING *`;
    
    const itemValues = [cartId, product.id, product.sku, product.price];
    const itemRes = await db.query(addItemQuery, itemValues);

    return itemRes.rows[0];
};

/**
 * Obtiene el detalle de todos los productos en el carrito de un usuario.
 * Realiza un JOIN para asegurar que los items pertenecen a la orden del usuario.
 */
const getCartContents = async (userId) => {
    const query = `
        SELECT oi.id_detalle, oi.id_producto, oi.sku, oi.precio
        FROM "order" o
        JOIN order_items oi ON o.id_carrito = oi.id_carrito
        WHERE o.id_usuario = $1
    `;
    
    const res = await db.query(query, [userId]);
    return res.rows;
};

// Elimina un producto especifico del carrito
const removeItemFromCart = async (idDetalle) => {
    const query = 'DELETE FROM order_items WHERE id_detalle = $1 RETURNING *';
    const res = await db.query(query, [idDetalle]);
    return res.rows[0];
};

module.exports = { 
    addProductToCart, 
    getCartContents,
    removeItemFromCart 
};