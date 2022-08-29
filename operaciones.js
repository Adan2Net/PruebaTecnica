const mysql = require("mysql");

function insert(conection, data, callback){
    let insertQuery = "INSERT INTO users (nombre) VALUES (?)"; //insertamos los datos a la tabla usuarios sin especificar el id
    let query = mysql.format(insertQuery, [data.nombre]);
    conection.query(query, function(err, result){
        if(err) throw err; 
        callback(result);
    })
}

function read(conection, callback){
    conection.query('SELECT * FROM users', function (err, result){ //hacemos una consulta a la base de datos para mostrar los datos en dicho tabla
        if (err) throw err;
        callback(result);
    });
}

function update(conection, data ,callback){
    const textRandoms = Math.random().toString(36).substring(7);
    let nombre = `${textRandoms}`;//llamamos a la constante textRandoms que nos genera un nombre cualquiera en la tabla de usuarios
    let updateQuery = "UPDATE users SET nombre = ? WHERE id = ?";
    let query = mysql.format(updateQuery, [nombre, data.id]);

    conection.query(query, function(err, result) {
        if(err) throw err;
        callback(result);
    });
}

function remove(conection, data, callback){
    let removeQuery = "DELETE FROM users WHERE id = ?";
    let query = mysql.format(removeQuery, [data.id]);// eliminamos un usuario de la tabla especificando su id

    conection.query(query, function (err,  result) {
        if(err) throw err;
        callback(result);
    });
}

module.exports = {insert, read, update, remove};