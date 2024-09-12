import fs from 'fs';
//const fs = require('fs');
import path from 'path';
//const path = require('path');
import https from 'https';
//const https = require('https');
import http from 'http';
//const http = require('http');
//const { parseStringPromise } = require('xml2js');
import mongoose from 'mongoose';
//const mongoose = require('mongoose');
import express from 'express';
//const express = require('express');
import cors from 'cors';
//const cors = require('cors');
const app = express();
//const bodyParser = require('body-parser');
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();
//require('dotenv').config();

//--------------------------- APP USE -------------------------------------------------------------
app.use(cors());
app.use(express.json());

app.use(express.static('/public'));

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
//-------------------------------------------------------------------------------------------------

app.get('/visitas', (req, res) =>{
	fs.readFile('contador.json', (err, data)=>{
    	if(err) throw err;
    	let visitas = JSON.parse(data);
    	visitas.visitas += 1;
    
    	fs.writeFile('contador.json', JSON.stringify(visitas), (err)=>{
        	if(err) throw err;
        	rs.json(visitas);
        });
    });
});

//------------------------- ENDPOINT PRINCIPAL ----------------------------------------------------
app.get('/api/deswebs', async (req, res) => {
    try {
        const deswebs = await Desweb.find().limit(100);
        res.json(deswebs);
    } catch (error) {
        console.error('Error al obtener libros:', error);
        res.status(500).send('Error al obtener libros');
    }
});
//-------------------------------------------------------------------------------------------------

const deswebSchema = new mongoose.Schema({
  id: String,
  title: String,
  nivel: String,
  video: String,
  cover: String,
  text: String,
});
const Desweb = mongoose.model('Desweb', deswebSchema);
//-------------------------------------------------------------------------------------------------

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    //return processDeswebs();
  })
  .catch(err => {
    console.error('Could not connect to MongoDB', err);
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

const PORT = process.env.PORT || 1048;
httpsServer.listen(PORT, () => {
//app.listen(PORT, () =>{
  console.log(`Server running on port ${PORT}`);
});