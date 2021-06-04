const Action = require('../actions/actions-model')
const Project = require('../projects/projects-model')

function logger(req, res, next) {
    console.log(
      `Request Method: ${req.method}, Request URL: ${req.url}, Time Stamp: ${Date.now()}`
    )
  }

// Project Middleware Below
async function validateProjectId(req, res, next) {
  const id = req.params.id
  const project = await Project.get(id)
  if(!project) {
    res.status(404).json({
      message: `project with id: ${id}, not found`
    })
  } else {
    req.project = project
    next()
  }
}

function validateProject(req, res, next) {
    const { name, description } = req.body
    if (!name || !description) {
      res.status(400).json({ message: 'missing required name and description field' })
    } else {
      next()
    }
  }

// Action Middleware Below  
async function validateActionId(req, res, next) {
    const id = req.params.id
    const action = await Action.get(id)
    if(!action) {
      res.status(404).json({
        message: `action with id: ${id}, not found`
      })
    } else {
      req.action = action
      next()
    }
  }

function validateAction(req, res, next) {
    const { project_id, description, notes } = req.body
    if (!project_id || !description || !notes) {
      res.status(400).json({ message: 'missing required project_id, description, and notes field' })
    } else {
      next()
    }
}
  
module.exports = {
    logger,
    validateProjectId,
    validateProject,
    validateActionId,
    validateAction
}