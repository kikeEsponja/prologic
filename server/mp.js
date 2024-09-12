import express from 'express';
import cors from 'cors';
import fs from 'fs';
import https from 'https';
import mysql from 'mysql';

import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({
    accessToken: 'APP_USR-8432442560190765-041215-148082dd38c850af894a9bfc768ffbbe-827650607',
});

const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'leer_admin',
  password: 'cubagua152',
  database: 'leer_cursos'
});

dbConnection.connect(err =>{
    if(err){
        console.error('error conectado a BDD', err);
        return;
    }
    console.log('Conectado de manera exitosa');
});

const app = express();
const port = 1027;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>{
    res.send("soy tu servidor: ");
});

app.post('/create_preference', async (req, res) =>{
    try{
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price),
                    currency_id: "ARS",
                },
            ],
            back_urls: {
                success: "https://qa.leeresmipasion.com/cursoliberado.html",
                failure: "https://fortrainevolution.com/",
                pending: "https://fortrainevolution.com/",
            },
            auto_return: 'approved',
        };

        const preference = new Preference(client);
        const result = await preference.create({ body });
        
        const updateQuery = `UPDATE cursos SET pagado = 1 WHERE id = 3`;
        dbConnection.query(updateQuery, [req.body.cursoId], (error, results)=>{
            if(error){
                console.error('Error actualizando BDD', error);
                res.status(500).json({
                    error: 'Error al actualizar BDD',
                });
            }else{
                res.json({
                    id: result.id
                });
            }
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            error: "Error al crear la preferencia",
        });
    }
});

/*app.listen(port, () =>{
    console.log(`servidor corriendo en ${port}`)
});*/

const privateKey = fs.readFileSync('./certificados/private.key', 'utf-8');
const certificate = fs.readFileSync('./certificados/certificate.crt', 'utf-8');
const credentials = {key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials, app);

const PORT = process.env.PORT || 1027;
httpsServer.listen(PORT, () => {
  //app.listen(PORT, () =>{
  console.log(`Server running on port ${PORT}`);
});