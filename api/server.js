const express = require('express');
const server = express();
// const { logger } = require('./middleware/middleware')

//Action and Project Routers
const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');

//Global Middleware
server.use(express.json());
// server.use(logger)

server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
