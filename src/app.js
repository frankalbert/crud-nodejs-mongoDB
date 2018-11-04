const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();

// connection a la BD
mongoose.connect('mongodb://localhost/crud-barbaro')
    .then(db => console.log('conectado a la BD'))
    .catch(err => console.log('ha habido un error'));

// importando la ruta de la index
const indexRoutes = require('./routes/index.js');


// settings
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));


// routes
app.use('/', indexRoutes);


// server
app.listen(5000, () => console.log('Servidor levantado en el puerto ' + app.get('port')));