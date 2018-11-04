const express = require('express');
const routes = express.Router();

const Tasks = require('../models/task');

routes.get('/', async (req, res) => {
    const tasks = await Tasks.find();
    const ID = await Tasks.findById(req.query.ID)
    if(req.originalUrl !== '/'){
        var nuevo = false;
    }else{
        var nuevo = true;
    }
    res.render('index', {
        title: 'CRUD BARBARO',
        tasks,
        nuevo,
        ID
    });
});

routes.post('/action', async (req, res) => {
    const task = new Tasks(req.body);
    await task.save();
    res.redirect('/');
});

routes.post('/action/:id', async (req, res) => {
    const id = req.params.id;
    await Tasks.findById(id).update(req.body);
    res.redirect('/');
});

routes.get('/cambiar-estado/:id', async (req, res) => {
    const id = req.params.id;
    const task = await Tasks.findById(id);
    task.status = !task.status;
    task.save();
    res.redirect('/');
});

routes.get('/eliminar/:id', async (req, res) => {
    const id = req.params.id;
    const task = await Tasks.remove({_id: id});
    res.redirect('/');
});

module.exports = routes;