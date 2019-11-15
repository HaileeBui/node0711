'use strict';

const express = require('express');
const app = express();

app.use(express.static('public'));


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


