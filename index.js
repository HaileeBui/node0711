'use strict';

require('dotenv').config();

const express = require('express');
const connection = require('./model/db.js');
const bodyParser = require('body-parser');


const app = express();

app.use(express.static('public'));

app.get('/animals', async (req,res) =>{
    try {
    const [results, fields]= await connection.promise().query(
        'SELECT * FROM animal');
            console.log(results);
            console.log(fields);
            res.json(results);  
    }catch (e){
        console.log(e);
        res.send('db error');
    }
});

app.get('/animal', async (req,res)=>{
    console.log(req.query);
    //res.send(`query param? ${req.query}`);
    try{
        const [results] = await connection.query(
            'SELECT * FROM animal WHERE name LIKE ?',
            [req.query.name]);
        res.json(results);
    }catch(e){
        res.send(`db error ${e}`);
    }
});

app.post('/animal', bodyParser.urlencoded({extended:true}), async (req,res)=>{
    console.log(req.body);
    try{
        const [result] = await connection.query(
            'INSERT INTO animal (name) VALUES (?)',
            [req.body.name]
        );
        res.json(result);
    }catch(e){
        console.log(e);
        res.send('db error');
    }
});


app.get('/',(request,response)=>{
    response.send('Hello from my Node server');
});

app.get('/demo', (request,response)=>{
    console.log('request',request);
    response.send('demo')
});

app.listen(3000, ()=>{
    console.log('server app start?')
});


