const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const dataPath = path.join(__dirname, "data.json");

app.use(bodyParser.json());
app.use(express.static(__dirname)); // serve HTML, CSS, immagini

// Legge i dati
app.get("/api/data", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) return res.status(500).send({ error: "Errore lettura file" });
    res.send(JSON.parse(data));
  });
});

// Aggiorna dati per un cantiere
app.post("/api/data/:cantiere", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) return res.status(500).send({ error: "Errore lettura file" });
    const jsonData = JSON.parse(data);
    jsonData.cantieri[req.params.cantiere] = req.body;
    fs.writeFile(dataPath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) return res.status(500).send({ error: "Errore scrittura file" });
      res.send({ success: true });
    });
  });
});

app.listen(PORT, () => console.log(`Server avviato: http://localhost:${PORT}`));
