import express from 'express';
//const express = require('express');
import bodyParser from 'body-parser';
//const bodyParser = require('body-parser');
import fs from 'fs';
//const fs = require('fs');
import https from 'https';
//const https = require('https');
//const bcrypt = require('bcrypt');
import cors from 'cors';
//const cors = require('cors');
import mysql from 'mysql';
//const mysql = require('mysql');

const app = express();
const port = 1047;

// Configuración de la conexión a la base de datos remota
const connection = mysql.createConnection({
  host: 'leeresmipasion.com',
  user: 'kike',
  password: '',
  database: 'leer_cursos'
});

// Configuración de la conexin a la base de datos local
/*const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'leer_cursos'
});*/

connection.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos establecida');
});

app.use(bodyParser.json());
app.use(cors());

app.post('/login', (req, res) => {

    const { email, password } = req.body;

    const query = 'SELECT nombre FROM leer_usuarios WHERE correo = ? AND contras = ?';
    connection.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error al buscar el usuario:', err);
            return res.status(500).json({ error: 'Error al buscar el usuario' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Credenciales invlidas' });
        }

        const username = results[0].nombre;
        res.status(200).json({ username });
    });
});

/*const privateKey = fs.readFileSync('../src/certificado/postfix.pem', 'utf-8');
const certificate = fs.readFileSync('../src/certificado/proftpd.pem', 'utf-8');
const credentials = {key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials, app);*/

let privateKey, certificate;

try {
  privateKey = fs.readFileSync('../src/certificado/privkey1.pem', 'utf-8');
} catch (error) {
  console.error("Error reading private key:", error.message);
  process.exit(1);
}

try {
  certificate = fs.readFileSync('../src/certificado/cert1.pem', 'utf-8');
} catch (error) {
  console.error("Error reading certificate:", error.message);
  process.exit(1);
}

const credentials = { key: privateKey, cert: certificate };

let httpsServer;

try {
  httpsServer = https.createServer(credentials, app);
} catch (error) {
  console.error("Error creating HTTPS server:", error.message);
  process.exit(1);
}

const PORT = process.env.PORT || 1047;
httpsServer.listen(PORT, () => {
//app.listen(PORT, () =>{
  console.log(`Server running on port ${PORT}`);
});