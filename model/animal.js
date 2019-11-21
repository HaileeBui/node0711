'use strict';

const connection = require('./db');

exports.getAll = async () => {
    try{
        const [results, fields]= await connection.query('SELECT * FROM animal');
        console.log(results);
        console.log(fields);
        return results 
    }catch (e){
        console.log(e);
        throw 'db error';
    }
}

exports.search = async (name) =>{
    try{
        const [results] = await connection.query(
            'SELECT * FROM animal WHERE name LIKE ?',[name]);
        return results;
    }catch(e){
        console.log(e);
        throw `db error`;
    }
}

exports.insert = async (name) =>{
    try{
        const [results] = await connection.query(
            'INSERT INTO animal (name) VALUES (?)',
            [name]
        );
        return results;
    }catch(e){
        console.log(e);
        throw 'db error';
    }
}