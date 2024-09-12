//const express = require('express');
import express from 'express';
//const session = require('express-session');
import session from 'express-session';
//const fs = require('fs');
import fs from 'fs';
//const mysql = require('mysql');
import mysql from 'mysql';
//const MySQLStore = require('express-mysql-session')(session);
import MySQLStore from 'express-mysql-session';
//const cors = require('cors');
import cors from 'cors';
import https from 'https';

const MySQLStoreSession = MySQLStore(session);

const app = express();

app.use(cors());
/*app.use(cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true
  }));*/

const options = {
    host: 'leeresmipasion.com',
    //port: 3306,
    user: 'kike',
    password: '',
    database: 'leer_cursos'
};

const connection = mysql.createConnection(options);

const sessionStore = new MySQLStoreSession({}, connection);

app.use(session({
    key: 'cookie_usuario',
    secret: '123456',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
}))

const port = 1044;

/*app.use(session({
    secret: '123456',
    resave: false,
    saveUninitialized: false
}));*/

connection.connect(err => {
    if(err){
        console.error('error al conectar a la BDD', err);
        return;
    }
    console.log('Connected to database');
});

app.get('/', (req, res) =>{
    connection.query('SELECT nombre FROM leer_usuarios WHERE ID = ?', [1], (error, results) =>{
        if(error){
            console.error('error al consultar la BDD', error);
            res.status(500).send('error del servidor');
            return;
        }

        if(results.length > 0){
            req.session.usuario = results[0].nombre;
        }else{
            req.session.usuario = 'usuario genérico';
        }
        req.session.rol = 'user';
        req.session.visitas = req.session.visitas ? ++req.session.visitas : 1;
        res.send(`El usuario <strong>${req.session.usuario}</strong> con rol <strong>${req.session.rol}</strong> ha visitado esta página <strong>${req.session.visitas}</strong> veces` );
    });
});

app.get('/userInfo', (req, res)=>{
    const userInfo = {
        usuarioNombre: req.session.usuario,
        usuarioCorreo: req.session.rol,
        usuarioVisitas: req.session.visitas
    };
    res.json(userInfo);
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

const PORT = process.env.PORT || 1044;
httpsServer.listen(PORT, () => {
//app.listen(PORT, () =>{
  console.log(`Server running on port ${PORT}`);
});