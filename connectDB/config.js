// const PORT = process.env.PORT || 3001

// const DB_HOST = process.env.DB_HOST || 'localhost'
// const DB_USER = process.env.DB_USER || 'root'
// const DB_PASSWORD = process.env.DB_PASSWORD || 'Maitena1.'
// const DB_NAME = process.env.DB_NAME || 'uade2024'
// const DB_PORT = process.env.DB_PORT || 3306

// module.exports = {
//     PORT,
//     DB_HOST,
//     DB_USER,
//     DB_PASSWORD,
//     DB_NAME,
//     DB_PORT
// }

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || "autorack.proxy.rlwy.net",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "ucrJBT5woiRbXQQtLVjSQFYWlEiwIooj",
    database: process.env.DB_NAME || "railway",
    port: process.env.MYSQLPORT ? parseInt(process.env.MYSQLPORT) : 47880,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000, 
    acquireTimeout: 10000, 
});

async function verificarConexion() {
    let intentos = 0;
    const maxIntentos = 5;

    while (intentos < maxIntentos) {
        try {
            const connection = await pool.getConnection();
            console.log('✅ Conexión a MySQL exitosa');
            connection.release();
            break;
        } catch (error) {
            console.error(`❌ Intento ${intentos + 1} - Error conectando a MySQL:`, error.message);
            intentos++;
            await new Promise((res) => setTimeout(res, 5000)); 
        }
    }

    if (intentos === maxIntentos) {
        console.error("🚨 No se pudo conectar a MySQL después de varios intentos. Apagando servidor.");
        process.exit(1);
    }
}

verificarConexion();

module.exports = { pool };

