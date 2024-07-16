const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.use(cors());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
})
db.connect(err=>{
    if (err) {
        console.error("db was not connecting")
        return;
    }
    console.log("connected")
})

app.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username, password);

        const sql = "SELECT * FROM login WHERE username = ? AND password = ?";
        db.query(sql, [username, password], (err, data) => {
            if (err) {
                console.error('Query error:', err);
                return res.status(500).send({ message: "Internal Server Error" });
            }
            if (data.length > 0) {
                return res.send({ message: "Login successful", data });
            } else {
                return res.status(401).send({ message: "Invalid credentials" });
            }
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

app.listen(8081, () => {
    console.log("listening...");
})