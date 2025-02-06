const express = require('express');
const app = express();
const cors = require('cors');
const PORT =require("./connectDB/config")

app.use(cors());

//PARA PODER PROCESAR JSON

app.use(express.json());

//LLAMAR A LA RUTAS
const proveedorroutes= require('./routes/proveedorRoute');
const clienteroutes= require('./routes/clienteRoute');
const productoroutes= require('./routes/productoRoute');
const pedidoroutes= require('./routes/pedidoRoute');


app.use('/api/proveedor',proveedorroutes)
app.use('/uploads', express.static('uploads'));
app.use('/api/cliente',clienteroutes)
app.use('/api/producto',productoroutes)
app.use('/api/pedido',pedidoroutes)


app.listen(PORT,() =>{
     console.log('listening on port '+ PORT);
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






