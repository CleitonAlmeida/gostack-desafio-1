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

//Global Middleware
server.use((req, res, next) => {
    console.count("countAccess");
    next();
})

//Middlewares
function checkIdParam(req, res, next){
    var id = undefined;
    if(!req.body.id && !req.params.id){
        return res.status(400).json({message: 'Id is required'});
    }
    return next();
}

function checkIdExists(req, res, next){
    var id = undefined;
    id = req.body.id;
    if(!req.body.id){
        id = req.params.id;
    }
    
    var found = projects.find(function(element){
        return element.id == id;
    });

    if(!found){
        return res.status(404).json({message: 'Project not found!'});
    }
    req.idProject = projects.map(function(project){
        return project.id
    }).indexOf(id);

    return next();
}

server.get('/projects', (req, res) => {
    return res.json(projects);
});

server.post('/projects', checkIdParam, (req, res) => {
    const id = req.body.id;
    const title = req.body.title;

    if(id <= 0){
        return res.status(400).json({message: 'Invalid id!'});
    }

    var found = projects.find(function(element){
        return element.id == id;
    });

    if(found){
        return res.status(400).json({message: 'Project already exists!'});
    }

    projects.push( 
        {
            id: id,
            title: title,
            tasks: []
        }
    );

    return res.json({message: 'Project created!'});
});

server.post('/projects/:id/tasks', checkIdParam, checkIdExists, (req, res) => {
    const idProject = req.idProject;
    const title = req.body.title;

    projects[idProject].tasks.push(title);
    return res.json({message: `Task added`});
});

server.put('/projects/:id', checkIdParam, checkIdExists, (req, res) => {
    const idProject = req.idProject;
    const title = req.body.title;

    projects[idProject].title = title;

    return res.json({message: `Project updated`});
});

server.delete('/projects/:id', checkIdParam, checkIdExists, (req, res) => {
    const idProject = req.idProject;

    projects.splice(idProject, 1);

    return res.json({message: `Project deleted`});
});

server.listen(3000);