const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || "autorack.proxy.rlwy.net",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "ucrJBT5woiRbXQQtLVjSQFYWlEiwIooj",
    database: process.env.DB_NAME || "railway",
    port: process.env.DB_PORT || 47880,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000
});

async function verificarConexion() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Conexión a MySQL exitosa');
        connection.release();
    } catch (error) {
        console.error("❌ Error conectando a MySQL:", error);
        process.exit(1);
    }
}

verificarConexion();

module.exports = { pool };
