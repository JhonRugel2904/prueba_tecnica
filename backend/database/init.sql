-- Tablas necesarias para la DB en local
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS "order";
DROP TABLE IF EXISTS usuario;

CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE "order" (
    id_carrito SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES usuario(id_usuario),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_compra DECIMAL(10, 2) DEFAULT 0
);

CREATE TABLE order_items (
    id_detalle SERIAL PRIMARY KEY,
    id_carrito INTEGER REFERENCES "order"(id_carrito),
    id_producto INTEGER NOT NULL,
    sku VARCHAR(50),
    precio DECIMAL(10, 2) NOT NULL
);

INSERT INTO usuario (nombre) VALUES ('Jhon Pietro');