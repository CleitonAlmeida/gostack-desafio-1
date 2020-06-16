const express = require('express');

const server = express();
//To use json on requisitions
server.use(express.json());

const projects = [
    {
        id: "1",
        title: "Project Zero",
        tasks: ["Task 1", "Task 2"]
    }
];

server.get('/projects', (req, res) => {
    return res.json(projects);
});

server.post('/projects', (req, res) => {
    const id = req.body.id;
    const title = req.body.title;

    projects.push( 
        {
            id: id,
            title: title,
            tasks: []
        }
    );

    return res.json({message: 'Project created!'});
});

server.post('/projects/:id/tasks', (req, res) => {
    const id = req.params.id;
    const title = req.body.title;

    projects[id-1].tasks.push(title);
    return res.json({message: `Task added`});
});

server.put('/projects/:id', (req, res) => {
    const id = req.params.id;
    const title = req.body.title;

    projects[id-1].title = title;

    return res.json({message: `Project id ${id} updated`});
});

server.delete('/projects/:id', (req, res) => {
    const id = req.params.id;

    projects.splice(id-1, 1);

    return res.json({message: `Project id ${id} deleted`});
});

server.listen(3000);