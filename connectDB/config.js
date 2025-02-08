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
    host: process.env.DB_HOST || 'autorack.proxy.rlwy.net',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'ucrJBTSwoiRbXQQtLVjSQFYwLEiwlooj',
    database: process.env.DB_NAME || 'railway',
    port: process.env.MYSQLPORT ? parseInt(process.env.MYSQLPORT) : 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Conexión a MySQL exitosa');
        connection.release();
    } catch (error) {
        console.error('❌ Error conectando a MySQL:', error);
    }
})();

const PORT = process.env.PORT;

if (!PORT) {
    console.error("❌ ERROR: process.env.PORT no está definido.");
    process.exit(1);
}

module.exports = { pool, PORT };  
