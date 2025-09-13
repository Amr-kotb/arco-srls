// server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve i file statici della cartella 'arco'
app.use(express.static(path.join(__dirname, "arco")));

// Endpoint root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "arco", "index.html"));
});

// Puoi aggiungere qui API personalizzate se vuoi logica lato server
// ma la sincronizzazione dei cantieri sarà gestita direttamente da Firebase JS SDK nei tuoi file HTML/JS

app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});
