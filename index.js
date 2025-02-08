const express = require('express');
const cors = require('cors');
const { pool, PORT } = require("./connectDB/config");

const app = express();

app.use(cors());
app.use(express.json());

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

const serverPort = process.env.PORT;

if (!serverPort) {
    console.log("⚠️ process.env.PORT no está definido. Usando 8080 por defecto.");
    process.env.PORT = 8080;
}

pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Error al conectar a MySQL:', err);
        process.exit(1); 
    } else {
        console.log('✅ Conexión a MySQL exitosa');
        connection.release(); 
    }
});

const server = app.listen(serverPort, '0.0.0.0', () => {
    console.log(`🚀 Servidor corriendo en el puerto ${serverPort}`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Error: El puerto ${serverPort} ya está en uso.`);
        process.exit(1); 
    } else {
        console.error('❌ Error inesperado en el servidor:', err);
    }
});

process.on('uncaughtException', (err) => {
    console.error('🚨 Excepción no controlada:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('🚨 Rechazo de promesa no manejado:', reason);
});

process.on('exit', (code) => {
    console.log(`🚨 El proceso de Node.js está cerrando con código ${code}`);
});

process.on('SIGINT', () => {
    console.log("🚨 SIGINT recibido. Cerrando servidor.");
    process.exit(1);
});

process.on('SIGTERM', () => {
    console.log("🚨 SIGTERM recibido. Railway podría estar matando el proceso.");
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






