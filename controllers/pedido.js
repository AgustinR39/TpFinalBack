const { pool } = require("../connectDB/config");

const getAllPedidos = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const query = `
            SELECT p.id, p.fechaCreacion, p.saldoTotal, pp.cantidad, 
                   c.nombre AS cliente, pr.nombre AS producto, pr.precioVenta
            FROM pedido p
            JOIN cliente c ON p.clienteId = c.id
            JOIN pedido_producto pp ON p.id = pp.pedidoId
            JOIN producto pr ON pp.productoId = pr.id
        `;
        const [rows] = await connection.query(query);
        res.json(rows);
    } catch (error) {
        console.error("❌ Error en getAllPedidos:", error);
        res.status(500).json({ error: "Error al obtener pedidos" });
    } finally {
        if (connection) connection.release();
    }
};

const getPedidoById = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const pedidoId = req.params.id;
        const query = `
            SELECT p.id, p.fechaCreacion, p.saldoTotal, pp.cantidad, 
                   c.nombre AS cliente, pr.nombre AS producto, pr.precioVenta
            FROM pedido p
            JOIN cliente c ON p.clienteId = c.id
            JOIN pedido_producto pp ON p.id = pp.pedidoId
            JOIN producto pr ON pp.productoId = pr.id
            WHERE p.id = ?
        `;
        const [rows] = await connection.query(query, [pedidoId]);
        res.json(rows);
    } catch (error) {
        console.error("❌ Error en getPedidoById:", error);
        res.status(500).json({ error: "Error al obtener el pedido" });
    } finally {
        if (connection) connection.release();
    }
};

const createPedido = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const { clienteId, fechaCreacion, productos } = req.body;
        if (!clienteId || !productos || productos.length === 0) {
            return res.status(400).json({ error: "Faltan campos requeridos o productos." });
        }

        const queryPedido = "INSERT INTO pedido (clienteId, saldoTotal, fechaCreacion) VALUES (?, ?, ?)";
        const [result] = await connection.query(queryPedido, [clienteId, 0, fechaCreacion]);
        const pedidoId = result.insertId;

        let totalPedido = 0;
        const detalles = productos.map(prod => {
            totalPedido += prod.precioVenta * prod.cantidad;
            return [pedidoId, prod.productoId, prod.cantidad];
        });

        const queryDetalle = "INSERT INTO pedido_producto (pedidoId, productoId, cantidad) VALUES ?";
        await connection.query(queryDetalle, [detalles]);

        const queryUpdateSaldo = "UPDATE pedido SET saldoTotal = ? WHERE id = ?";
        await connection.query(queryUpdateSaldo, [totalPedido, pedidoId]);

        await connection.commit();
        res.json({ message: "Pedido creado con éxito", pedidoId });
    } catch (error) {
        if (connection) await connection.rollback();
        console.error("❌ Error en createPedido:", error);
        res.status(500).json({ error: "Error al crear el pedido" });
    } finally {
        if (connection) connection.release();
    }
};

const updatePedido = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const pedidoId = req.params.id;
        const { clienteId, fechaCreacion, productos } = req.body;
        if (!clienteId || !productos || productos.length === 0) {
            return res.status(400).json({ error: "Faltan campos requeridos o productos." });
        }

        const queryUpdatePedido = "UPDATE pedido SET clienteId = ?, fechaCreacion = ? WHERE id = ?";
        await connection.query(queryUpdatePedido, [clienteId, fechaCreacion, pedidoId]);

        const queryDeleteDetalle = "DELETE FROM pedido_producto WHERE pedidoId = ?";
        await connection.query(queryDeleteDetalle, [pedidoId]);

        let totalPedido = 0;
        const detalles = productos.map(prod => {
            totalPedido += prod.precioVenta * prod.cantidad;
            return [pedidoId, prod.productoId, prod.cantidad];
        });

        const queryDetalle = "INSERT INTO pedido_producto (pedidoId, productoId, cantidad) VALUES ?";
        await connection.query(queryDetalle, [detalles]);

        const queryUpdateSaldo = "UPDATE pedido SET saldoTotal = ? WHERE id = ?";
        await connection.query(queryUpdateSaldo, [totalPedido, pedidoId]);

        await connection.commit();
        res.json({ message: "Pedido actualizado con éxito", pedidoId });
    } catch (error) {
        if (connection) await connection.rollback();
        console.error("❌ Error en updatePedido:", error);
        res.status(500).json({ error: "Error al actualizar el pedido" });
    } finally {
        if (connection) connection.release();
    }
};

const deletePedido = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const pedidoId = req.params.id;

        const queryDeleteDetalle = "DELETE FROM pedido_producto WHERE pedidoId = ?";
        await connection.query(queryDeleteDetalle, [pedidoId]);

        const queryDeletePedido = "DELETE FROM pedido WHERE id = ?";
        await connection.query(queryDeletePedido, [pedidoId]);

        await connection.commit();
        res.json({ message: "Pedido eliminado con éxito" });
    } catch (error) {
        if (connection) await connection.rollback();
        console.error("❌ Error en deletePedido:", error);
        res.status(500).json({ error: "Error al eliminar el pedido" });
    } finally {
        if (connection) connection.release();
    }
};

module.exports = { getAllPedidos, getPedidoById, createPedido, updatePedido, deletePedido };