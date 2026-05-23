const express = require('express');
const cors = require('cors'); 
const sqlite3 = require('sqlite3').verbose();

const app = express();

app.use(cors());
app.use(express.json()); 

const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) console.error(err.message);
    console.log('Conectado ao banco de dados SQLite.');
});

db.run(`CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT NOT NULL,
    completed INTEGER DEFAULT 0
)`);

app.get('/', (req, res) => {
    res.send('Todo List funcionando!');
});

app.get('/todos', (req, res) => {
    db.all('SELECT * FROM todos', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/todos', (req, res) => {
    const { task } = req.body;
    db.run('INSERT INTO todos (task) VALUES (?)', [task], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, task, completed: 0 });
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});