const express = require('express');
const cors = require('cors');
const { pool, PORT } = require("./connectDB/config");

const app = express();
app.use(cors()); 
app.use(express.json());

console.log('🚀 Iniciando servidor...');
console.log(`🔹 Variable de entorno PORT: ${process.env.PORT}`);
console.log(`🔹 Variable en config.js PORT: ${PORT}`);

app.use((req, res, next) => {
    console.log(`➡️  Nueva solicitud recibida: ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    console.log('✔️ Respuesta a "/" enviada correctamente');
    res.send('🚀 Backend funcionando correctamente');
});

const proveedorroutes = require('./routes/proveedorRoute');
const clienteroutes = require('./routes/clienteRoute');
const productoroutes = require('./routes/productoRoute');
const pedidoroutes = require('./routes/pedidoRoute');

app.use('/api/proveedor', proveedorroutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/cliente', clienteroutes);
app.use('/api/producto', productoroutes);
app.use('/api/pedido', pedidoroutes);

const serverPort = process.env.PORT || 3001;

app.listen(serverPort, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${serverPort}`);
    console.log('✅ Esperando solicitudes...');
});

app.listen(serverPort, '0.0.0.0', () => {
    console.log(`🚀 Servidor corriendo en el puerto ${serverPort}`);
});







// require('dotenv').config();

// const express = require('express');
// const cors = require('cors');

// const app = express();

// // Configuración de CORS
// const corsOptions = {
//   origin: [
//     'https://final-c7e61.web.app', // URL del nuevo deploy del frontend
//     'https://final-c7e61.firebaseapp.com', // URL alternativa del nuevo deploy
//   ],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
//   allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
//   credentials: true, // Permitir cookies y headers personalizados
// };

// app.use(cors(corsOptions));

// // Middleware para manejar JSON
// app.use(express.json());

// // Importar rutas
// const proveedorroutes = require('./routes/proveedorRoute');
// const clienteroutes = require('./routes/clienteRoute');
// const productoroutes = require('./routes/productoRoute');
// const pedidoroutes = require('./routes/pedidoRoute');

// // Configuración de las rutas
// app.use('/api/proveedor', proveedorroutes);
// app.use('/uploads', express.static('uploads'));
// app.use('/api/cliente', clienteroutes);
// app.use('/api/producto', productoroutes);
// app.use('/api/pedido', pedidoroutes);

// // Configuración del puerto
// const PORT = process.env.PORT || 3001;

// // Iniciar el servidor
// app.listen(PORT, () => {
//   console.log('Listening on port ' + PORT);
// });






