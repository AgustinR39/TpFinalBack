const express = require('express');
const cors = require('cors');
const { pool } = require("./connectDB/config");

const app = express();
app.use(cors({ origin: "https://tpfinalfront-production.up.railway.app" }));
app.use(express.json());

app.use((req, res, next) => {
    console.log(`➡️ Nueva solicitud recibida: ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send('🚀 Backend funcionando correctamente');
});

const proveedorroutes = require('./routes/proveedorRoute');
const clienteroutes = require('./routes/clienteRoute');
const productoroutes = require('./routes/productoRoute');
const pedidoroutes = require('./routes/pedidoRoute');

app.use('/api/proveedor', proveedorroutes);
app.use('/api/cliente', clienteroutes);
app.use('/api/producto', productoroutes);
app.use('/api/pedido', pedidoroutes);

const serverPort = process.env.PORT || 8080;
app.listen(serverPort, '0.0.0.0', () => {
    console.log(`🚀 Servidor corriendo en el puerto ${serverPort}`);
});