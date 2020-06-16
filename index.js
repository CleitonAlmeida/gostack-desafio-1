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

    return res.json({'message': 'Project created!'});
});

server.listen(3000);