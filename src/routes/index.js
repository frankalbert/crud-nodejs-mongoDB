const express = require('express');
const routes = express.Router();

const Tasks = require('../models/task');

routes.get('/', async (req, res) => {
    const tasks = await Tasks.find();
    res.render('index', {
        title: 'Bievenidos a mi CRUD',
        tasks
    });
});

// nueva tarea
routes.post('/nueva-tarea', async (req, res) => {
    const task = await new Tasks(req.body);
    task.save();
    res.redirect('/');
});

// confirmar tarea
routes.get('/confirmar/:id', async (req, res) => {
    const id = req.params.id;
    const task = await Tasks.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/'); 
});

// eliminar tarea
routes.get('/eliminar/:id', async (req, res) => {
    const id = req.params.id;
    await Tasks.remove({_id: id});
    res.redirect('/');
});

// editar tarea
routes.get('/editar/:id', async (req, res) => {
    const id = req.params.id;
    const task = await Tasks.findById(id);
    res.render('task', {
        title: "Editar Tarea",
        task
    }); 
});

routes.post('/modificar/:id', async (req, res) => {
    const id = req.params.id;
    const task = await Tasks.findById(id).update(req.body);
    res.redirect('/');
});

module.exports = routes;