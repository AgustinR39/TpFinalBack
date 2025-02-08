const connection = require("../connectDB/dBconnection");

function getAllPedidos(req, res) {
    const query = `
        SELECT p.id, p.fechaCreacion, p.saldoTotal, pp.cantidad, 
               c.nombre AS cliente, pr.nombre AS producto, pr.precioVenta
        FROM pedido p
        JOIN cliente c ON p.clienteId = c.id
        JOIN pedido_producto pp ON p.id = pp.pedidoId
        JOIN producto pr ON pp.productoId = pr.id
    `;

    connection.query(query, (err, result) => {
        if (err) {
            console.error("Error al consultar pedidos: ", err);
            res.status(500).json({ error: "Error al obtener pedidos de la base de datos" });
        } else {
            res.json(result);
        }
    });
}

function getPedidoById(req, res) {
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

    connection.query(query, [pedidoId], (err, result) => {
        if (err) {
            console.error("Error al obtener pedido por ID: ", err);
            res.status(500).json({ error: "Error al obtener el pedido desde la base de datos" });
        } else {
            res.json(result);
        }
    });
}

function createPedido(req, res) {
    const { clienteId, fechaCreacion, productos } = req.body;

    if (!clienteId || !productos || productos.length === 0) {
        return res.status(400).json({ error: "Faltan campos requeridos o productos." });
    }

    const queryPedido = "INSERT INTO pedido (clienteId, saldoTotal, fechaCreacion) VALUES (?, ?, ?)";
    connection.query(queryPedido, [clienteId, 0, fechaCreacion], function (err, result) {
        if (err) {
            console.error("Error al crear el pedido:", err);
            return res.status(500).json({ error: "No se pudo crear el pedido." });
        }

        const pedidoId = result.insertId;
        let totalPedido = 0;

        let queryDetalle = "INSERT INTO pedido_producto (pedidoId, productoId, cantidad) VALUES ?";
        const detalles = productos.map(prod => {
            totalPedido += prod.precioVenta * prod.cantidad;
            return [pedidoId, prod.productoId, prod.cantidad];
        });

        connection.query(queryDetalle, [detalles], function (err) {
            if (err) {
                console.error("Error al insertar detalles del pedido:", err);
                return res.status(500).json({ error: "No se pudieron insertar los detalles del pedido." });
            }

            const queryUpdateSaldo = "UPDATE pedido SET saldoTotal = ? WHERE id = ?";
            connection.query(queryUpdateSaldo, [totalPedido, pedidoId], function (err) {
                if (err) {
                    console.error("Error al actualizar el saldo del pedido:", err);
                    return res.status(500).json({ error: "No se pudo actualizar el saldo del pedido." });
                }
                res.json({ message: "Pedido creado con éxito", pedidoId });
            });
        });
    });
}

function updatePedido(req, res) {
    const pedidoId = req.params.id;
    const { clienteId, fechaCreacion, productos } = req.body;

    if (!clienteId || !productos || productos.length === 0) {
        return res.status(400).json({ error: "Faltan campos requeridos o productos." });
    }

    const queryUpdatePedido = "UPDATE pedido SET clienteId = ?, fechaCreacion = ? WHERE id = ?";
    connection.query(queryUpdatePedido, [clienteId, fechaCreacion, pedidoId], function (err) {
        if (err) {
            console.error("Error al actualizar el pedido:", err);
            return res.status(500).json({ error: "No se pudo actualizar el pedido." });
        }

        const queryDeleteDetalle = "DELETE FROM pedido_producto WHERE pedidoId = ?";
        connection.query(queryDeleteDetalle, [pedidoId], function (err) {
            if (err) {
                console.error("Error al eliminar detalles antiguos:", err);
                return res.status(500).json({ error: "No se pudo eliminar los detalles del pedido." });
            }

            let totalPedido = 0;
            let queryDetalle = "INSERT INTO pedido_producto (pedidoId, productoId, cantidad) VALUES ?";
            const detalles = productos.map(prod => {
                totalPedido += prod.precioVenta * prod.cantidad;
                return [pedidoId, prod.productoId, prod.cantidad];
            });

            connection.query(queryDetalle, [detalles], function (err) {
                if (err) {
                    console.error("Error al insertar nuevos detalles:", err);
                    return res.status(500).json({ error: "No se pudieron insertar los nuevos detalles." });
                }

                const queryUpdateSaldo = "UPDATE pedido SET saldoTotal = ? WHERE id = ?";
                connection.query(queryUpdateSaldo, [totalPedido, pedidoId], function (err) {
                    if (err) {
                        console.error("Error al actualizar saldo:", err);
                        return res.status(500).json({ error: "No se pudo actualizar el saldo del pedido." });
                    }
                    res.json({ message: "Pedido actualizado con éxito", pedidoId });
                });
            });
        });
    });
}

function deletePedido(req, res) {
    const pedidoId = req.params.id;
    const queryDeleteDetalle = "DELETE FROM pedido_producto WHERE pedidoId = ?";
    connection.query(queryDeleteDetalle, [pedidoId], function (err) {
        if (err) {
            console.error("Error al eliminar detalles del pedido:", err);
            return res.status(500).json({ error: "No se pudieron eliminar los detalles del pedido." });
        }
        const queryDeletePedido = "DELETE FROM pedido WHERE id = ?";
        connection.query(queryDeletePedido, [pedidoId], function (err) {
            if (err) {
                console.error("Error al eliminar el pedido:", err);
                return res.status(500).json({ error: "No se pudo eliminar el pedido." });
            }
            res.json({ message: "Pedido eliminado con éxito" });
        });
    });
}

module.exports = { getAllPedidos, getPedidoById, createPedido, updatePedido, deletePedido };