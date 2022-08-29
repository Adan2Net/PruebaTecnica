const express = require("express");
const app = express();
const mysql = require("mysql");
require("dotenv").config();

const {insert , read, update, remove} = require("./operaciones");//importamos las funciones del crud
app.use(express.json());

const conection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE,
});

conection.connect((err) =>{
    if(err) throw err;
    console.log("Connected to database");
});


app.get("/", (req, res) => {
    res.send("Hello world")
})

//ruta para insertar datos en la tabla de usuarios
app.get("/insert", (req, res) => {
    insert(conection, {nombre: 'adan camacho'}, result => { //agrego el nombre de adan camacho a la tabla 
        res.json(result);
    })
})

// ruta para leer los datos en la tabla de usuarios
app.get("/read", (req, res) => {
    read(conection, result => {
        res.json(result);
    })
})

app.get("/update", (req, res) => {
    update(conection, {id: 1}, result => {//especificamos el id en donde se va a crear un usuario cualquiera en este caso el id:1
        res.json(result);
    })
})

app.get("/remove", (req, res) => {
    remove(conection, {id: 1}, result => {//especificamos el id en donde se va a crear un usuario cualquiera en este caso el id:1
        res.json(result);
    })
})


app.listen( 3000, () => console.log("Server is running in port: " + 3000));