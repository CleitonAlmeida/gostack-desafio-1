const express = require('express');

const server = express();

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

server.listen(3000)