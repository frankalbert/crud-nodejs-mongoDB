const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();

// importando rutas
const IndexRoutes = require('./routes/index');

// conexión a la BD
mongoose.connect('mongodb://localhost/crud-nodejs-mongodb')
    .then(db => console.log('Conectado a la BD'))
    .catch(err => console.log(err));

// settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));


// routes
app.use('/', IndexRoutes);
 



// puerto de salida
app.listen(4000, () => {console.log(`Servidor levantado en el puerto ${app.get('port')}`)});