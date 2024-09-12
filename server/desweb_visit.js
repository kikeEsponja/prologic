//const express = require('express');
import express from 'express';
//const session = require('express-session');
//import session from 'express-session';
//const fs = require('fs');
import fs from 'fs';
//const mysql = require('mysql');
//import mysql from 'mysql';
//const MySQLStore = require('express-mysql-session')(session);
//import MySQLStore from 'express-mysql-session';
//const cors = require('cors');
import cors from 'cors';
import https from 'https';
const port = 1045;
const app = express();
// Ruta para servir archivos estáticos (HTML)
app.use(express.static('public'));
app.use(cors());

// Ruta para obtener el número de visitas
app.get('/visitas', (req, res) => {
    fs.readFile('contador.json', (err, data) => {
        if (err) throw err;
        let visitas = JSON.parse(data);
        visitas.visitas += 1;

        fs.writeFile('contador.json', JSON.stringify(visitas), (err) => {
            if (err) throw err;
            res.json(visitas);
        });
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

const PORT = process.env.PORT || 1045;
httpsServer.listen(PORT, () => {
//app.listen(PORT, () =>{
  console.log(`Server running on port ${PORT}`);
});