const { pool } = require("../connectDB/config");

const getAllProductos = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const query = "SELECT * FROM producto";
        const [rows] = await connection.query(query);
        res.json(rows);
    } catch (error) {
        console.error("❌ Error en getAllProductos:", error);
        res.status(500).json({ error: "Error al obtener productos" });
    } finally {
        if (connection) connection.release();
    }
};

const getProductoById = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const productoId = req.params.id;
        const query = "SELECT * FROM producto WHERE id = ?";
        const [rows] = await connection.query(query, [productoId]);
        res.json(rows);
    } catch (error) {
        console.error("❌ Error en getProductoById:", error);
        res.status(500).json({ error: "Error al obtener el producto" });
    } finally {
        if (connection) connection.release();
    }
};

const createProducto = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const { nombre, nombreComercial, seleccion, precioVenta, proveedor, precioCompra } = req.body;
        const fotoProducto = req.file ? `../uploads/${req.file.filename}` : null;
        const query = "INSERT INTO producto (nombre, nombreComercial, seleccion, precioVenta, proveedor, precioCompra, fotoProducto) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const [result] = await connection.query(query, [nombre, nombreComercial, seleccion, precioVenta, proveedor, precioCompra, fotoProducto]);
        res.json({ message: "Producto creado con éxito", productoId: result.insertId });
    } catch (error) {
        console.error("❌ Error en createProducto:", error);
        res.status(500).json({ error: "Error al crear el producto" });
    } finally {
        if (connection) connection.release();
    }
};

const updateProducto = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const id = req.params.id;
        const { nombre, nombreComercial, seleccion, precioVenta, proveedor, precioCompra } = req.body;
        const fotoProducto = req.file ? `../uploads/${req.file.filename}` : null;
        const query = "UPDATE producto SET nombre=?, nombreComercial=?, seleccion=?, precioVenta=?, proveedor=?, precioCompra=?, fotoProducto=? WHERE id=?";
        await connection.query(query, [nombre, nombreComercial, seleccion, precioVenta, proveedor, precioCompra, fotoProducto, id]);
        res.json({ message: "Producto actualizado con éxito" });
    } catch (error) {
        console.error("❌ Error en updateProducto:", error);
        res.status(500).json({ error: "Error al actualizar el producto" });
    } finally {
        if (connection) connection.release();
    }
};

const deleteProducto = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const productoId = req.params.id;
        const query = "DELETE FROM producto WHERE id=?";
        await connection.query(query, [productoId]);
        res.json({ message: "Producto eliminado con éxito" });
    } catch (error) {
        console.error("❌ Error en deleteProducto:", error);
        res.status(500).json({ error: "Error al eliminar el producto" });
    } finally {
        if (connection) connection.release();
    }
};

module.exports = {
    getAllProductos,
    createProducto,
    updateProducto,
    getProductoById,
    deleteProducto
};