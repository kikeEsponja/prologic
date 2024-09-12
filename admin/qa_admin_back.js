const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const fs = require('fs');
const https = require('https');
const cors = require('cors');

const app = express();
const port = 3305;

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'leer_admin',
  password: 'cubagua152',
  database: 'leer_cursos'
});

// Conexión a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos exitosa');
});

// Middleware para procesar datos JSON
app.use(bodyParser.json());
app.use(cors());

  app.get('/cursos', (req, res) => {
  connection.query('SELECT * FROM leer_productos', (error, cursos) => {
    if (error) {
      console.error('Error al obtener la lista de cursos', error);
      return res.status(500).json({ error: 'Error al obtener lista de cursos' });
    }
    res.status(200).json(cursos);
  });
});

app.post('/registro', (req, res) => {
  const { nombre, precio } = req.body;

  if (!nombre || !precio) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }
  
  connection.query('SELECT * FROM leer_productos WHERE nombre = ?', [nombre], (err, results) => {
      if(err){
          console.error('error al verificar nombre:', err);
          return res.status(500).json({ error: 'Error al registrar producto' });
        }
      
        if(results.length > 0){
          return res.status(400).json({ error: 'El producto ya existe' });
        }
      
        const query = 'INSERT INTO leer_productos (nombre, precio) VALUES (?, ?)';
        connection.query(query, [nombre, precio], (err, result) => {
            if (err) {
                console.error('Error al insertar producto:', err);
                return res.status(500).json({ error: 'Error al registrar producto' });
                }
                console.log('Producto registrado correctamente');
            
                connection.query('SELECT * FROM leer_productos', (error, cursos) => {
                    if(error){
                        console.error('error al obtener la lista de cursos', error);
                        return res.status(500).json({ error: 'error al obtener lista de cursos' });
                    }
                    res.status(201).json({ message: 'producto registrado correctamente' });
                });
            });
        });
  });
  

  /*app.post('/cursos', (req, res) => {
      const {nombre, precio} = req.body;
      
      const query = 'SELECT * FROM cursos';
      connection.query(query, (err, result)=>{
          if(err){
              console.error('error al verificar nombre', err);
              return res.status(500).json({error: 'error al obtener lista'});
          }
          res.status(200).json({message: 'producto bien'});
      });
  });*/
  
//Inicia el servidor
/*app.listen(port, () => {
  console.log(`Servidor escuchando en:${port}`);*/

const privateKey = fs.readFileSync('../src/certificado/private.key', 'utf-8');
const certificate = fs.readFileSync('../src/certificado/certificate.crt', 'utf-8');
const credentials = {key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
  //app.listen(PORT, () =>{
  console.log(`Server running on port ${port}`);
});