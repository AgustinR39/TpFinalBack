const { pool } = require("../connectDB/config");

const getAllClientes = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query("SELECT * FROM cliente");
        res.json(rows);
    } catch (error) {
        console.error("❌ Error en getAllClientes:", error);
        res.status(500).json({ error: "Error al obtener clientes" });
    } finally {
        if (connection) connection.release();
    }
};

const createCliente = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const { nombre, cuit } = req.body;
        const query = "INSERT INTO cliente (nombre, cuit) VALUES (?, ?)";
        const [result] = await connection.query(query, [nombre, cuit]);
        res.json({ message: "Cliente creado con éxito", clienteId: result.insertId });
    } catch (error) {
        console.error("❌ Error en createCliente:", error);
        res.status(500).json({ error: "Error al crear el cliente" });
    } finally {
        if (connection) connection.release();
    }
};

const updateCliente = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const { id } = req.params;
        const { nombre, cuit } = req.body;
        const query = "UPDATE cliente SET nombre=?, cuit=? WHERE id=?";
        await connection.query(query, [nombre, cuit, id]);
        res.json({ message: "Cliente actualizado con éxito" });
    } catch (error) {
        console.error("❌ Error en updateCliente:", error);
        res.status(500).json({ error: "Error al actualizar el cliente" });
    } finally {
        if (connection) connection.release();
    }
};

const getClienteById = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const clienteId = req.params.id;
        const query = "SELECT * FROM cliente WHERE id = ?";
        const [rows] = await connection.query(query, [clienteId]);
        res.json(rows);
    } catch (error) {
        console.error("❌ Error en getClienteById:", error);
        res.status(500).json({ error: "Error al obtener el cliente" });
    } finally {
        if (connection) connection.release();
    }
};

const deleteCliente = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const clienteId = req.params.id;
        const query = "DELETE FROM cliente WHERE id=?";
        await connection.query(query, [clienteId]);
        res.json({ message: "Cliente eliminado con éxito" });
    } catch (error) {
        console.error("❌ Error en deleteCliente:", error);
        res.status(500).json({ error: "Error al eliminar el cliente" });
    } finally {
        if (connection) connection.release();
    }
};

module.exports = {
    getAllClientes,
    createCliente,
    updateCliente,
    getClienteById,
    deleteCliente
};