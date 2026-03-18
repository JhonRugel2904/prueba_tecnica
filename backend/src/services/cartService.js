const db = require('../config/db');

/**
 * Logica de negocio para el carrito de compras
 * Se encarga de implementar la creacion de forma automatica de ordenes en caso el usuario no tenga activo
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

module.exports = { addProductToCart };