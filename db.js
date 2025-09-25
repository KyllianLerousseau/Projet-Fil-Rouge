const mysql = require("mysql2");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "Tortue85!",
    database: "testdb"
});

db.connect(err => {
  if (err) {
    console.error("Erreur connexion MySQL:", err);
    return;
  }
  console.log("Connecté à MySQL !");
});

module.exports = db;