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
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>Créer un compte</title>
        <link rel="stylesheet" href="/styles/signup.css">
      </head>
      <body>
      <div class="form-container">
        <form action="/submit" method="POST" class="form">
          <input type="text" name="name" placeholder="Votre nom" required>
          <input type="email" name="email" placeholder="Votre email" required>
          <button class="submitBtn" type="submit">Envoyer</button>
        </form>
      </div>
      <button class="backBtn" onclick="back()">Retour</button>
      </body>
    <script src="./back.js"></script>
    </html>
  `);
});

app.post("/submit", (req, res) => {
    const { name, email } = req.body;

    const sql = "INSERT INTO users (name, email) VALUES (?, ?, ?)";
    db.query(sql, [name, email], (err, results) => {
        if(err || email === email) {
            console.error(err);
            return res.send("Erreur lors de l'insertion dans la base de données !")
        }

        res.redirect("/");
    });
});

app.listen(PORT, () => console.log(`Serveur en écoute sur http://localhost:${PORT}`));