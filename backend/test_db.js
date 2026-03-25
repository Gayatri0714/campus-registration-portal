const mysql = require('mysql2/promise');
async function test() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: ''
        });
        console.log("MySQL connection SUCCESS.");
        const [rows] = await connection.query("SHOW DATABASES LIKE 'campus_events_db'");
        if (rows.length > 0) {
            console.log("Database 'campus_events_db' EXISTS.");
        } else {
            console.log("Database 'campus_events_db' DOES NOT EXIST.");
        }
        process.exit(0);
    } catch (e) {
        console.error("MySQL connection FAILED:");
        console.error(e.message);
        process.exit(1);
    }
}
test();
