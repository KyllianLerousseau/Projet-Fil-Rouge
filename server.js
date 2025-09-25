const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(__dirname, "index.html");
});

app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).send("Erreur SQL");
    res.json(results);
  });
});

app.get("/redirect", (req, res) => {
    res.redirect("/creerCompte");
});

app.get("/creerCompte", (req, res) => {
  res.send(`
    <form action="/submit" method="POST">
      <input type="text" name="name" placeholder="Votre nom" required>
      <input type="email" name="email" placeholder="Votre email" required>
      <button type="submit">Envoyer</button>
    </form>
  `);
});

app.post("/submit", (req, res) => {
    const { name, email } = req.body;

    const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
    db.query(sql, [name, email], (err, result) => {
        if(err) {
            console.error(err);
            return res.send("Erreur lors de l'insertion dans la base de données !")
        }

        res.redirect("/");
    });
});

app.listen(PORT, () => console.log(`Serveur en écoute sur http://localhost:${PORT}`));