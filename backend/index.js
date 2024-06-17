const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

//conexion con la BD
mongoose
    .connect('mongodb://127.0.0.1:27017/empleados')
    .then((x)=>{
        console.log(`Conectado exitosamente a la base de datos ${x.connections[0].name}`)
    })
    .catch((error)=>{
        console.log('Error de conexión: ', error.reason)
    })


//Configuracion del servidor web
const empleadoRouter = require('./routes/empleados.routes')
const app = express()

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: false,

    })
)
app.use(cors())
app.use('/api',empleadoRouter)

//Habilitar el puerto
const port = process.env.PORT || 4000
const server = app.listen(port,() =>{
    console.log('Escuchando el puerto: ' + port)
})

//Manejador de errot 404
app.use((req,res,next)=>{
    next((createError(404)))
})

//Manejador de errores
app.use(function(err,req,res,next){
    console.log(err.menssage)
    if(!err.statusCode) err.statusCode = 500
    res.status(err.statusCode).send(err.menssage)
})