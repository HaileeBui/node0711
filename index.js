'use strict';

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const animal = require('./model/animal');


const app = express();

app.use(express.static('public'));

app.get('/animals', async (req,res) =>{
    try {
        res.json(await animal.getAll());
    }catch (e){
        console.log(e);
        res.send('db error');
    }
});

app.get('/animal', async (req,res)=>{
    console.log(req.query);
    //res.send(`query param? ${req.query}`);
    try{
        res.json(await animal.search(req.query.name));
    }catch(e){
        console.log(e);
        res.send(`db error`);
    }
});

app.post('/animal', bodyParser.urlencoded({extended:true}), async (req,res)=>{
    console.log(req.body);
    try{
        res.json(animal.insert(req.body.name));
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


