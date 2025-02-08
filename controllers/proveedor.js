const { pool } = require("../connectDB/config");

const getAllProveedores = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const query = "SELECT * FROM proveedor";
        const [rows] = await connection.query(query);
        res.json(rows);
    } catch (error) {
        console.error("❌ Error en getAllProveedores:", error);
        res.status(500).json({ error: "Error al obtener proveedores" });
    } finally {
        if (connection) connection.release();
    }
};

const getProveedorById = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const proveedorId = req.params.id;
        const query = "SELECT * FROM proveedor WHERE id = ?";
        const [rows] = await connection.query(query, [proveedorId]);
        res.json(rows);
    } catch (error) {
        console.error("❌ Error en getProveedorById:", error);
        res.status(500).json({ error: "Error al obtener el proveedor" });
    } finally {
        if (connection) connection.release();
    }
};

const createProveedor = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const { nombre, cuit } = req.body;
        const query = "INSERT INTO proveedor (nombre, cuit) VALUES (?, ?)";
        const [result] = await connection.query(query, [nombre, cuit]);
        res.json({ message: "Proveedor creado con éxito", proveedorId: result.insertId });
    } catch (error) {
        console.error("❌ Error en createProveedor:", error);
        res.status(500).json({ error: "Error al crear el proveedor" });
    } finally {
        if (connection) connection.release();
    }
};

const updateProveedor = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const id = req.params.id;
        const { nombre, cuit } = req.body;
        const query = "UPDATE proveedor SET nombre=?, cuit=? WHERE id=?";
        await connection.query(query, [nombre, cuit, id]);
        res.json({ message: "Proveedor actualizado con éxito" });
    } catch (error) {
        console.error("❌ Error en updateProveedor:", error);
        res.status(500).json({ error: "Error al actualizar el proveedor" });
    } finally {
        if (connection) connection.release();
    }
};

const deleteProveedor = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const proveedorId = req.params.id;
        const query = "DELETE FROM proveedor WHERE id=?";
        await connection.query(query, [proveedorId]);
        res.json({ message: "Proveedor eliminado con éxito" });
    } catch (error) {
        console.error("❌ Error en deleteProveedor:", error);
        res.status(500).json({ error: "Error al eliminar el proveedor" });
    } finally {
        if (connection) connection.release();
    }
};

module.exports = {
    getAllProveedores,
    createProveedor,
    updateProveedor,
    getProveedorById,
    deleteProveedor
};