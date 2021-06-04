// Write your "projects" router here!
const express = require('express');
const router = express.Router();
const Project = require('./projects-model.js')

const { validateProjectId, validateProject } = require('./../middleware/middleware')

router.get('/', (req, res, next) => {
    Project.get()
    .then((projects) => res.json(projects))
    .catch((err) => next(err));
})

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project)
})

router.post('/', validateProject, (req, res, next) => {
    Project.insert(req.body)
    .then(({id}) => {
        return Project.get(id)
      })
    .then(project => res.status(201).json(project))
    .catch(err => next(err))
})

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
    const id = req.params.id
    const body = req.body
    Project.get(id)
      .then(() => {
        return Project.update(id, body)
      })
      .then(() => {
        return Project.get(id)
      })
    .then(project => res.json(project))
    .catch(err => next(err))
});

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
      const id = req.params.id
      const projectId = await Project.get(id)
        if(projectId) {
          await Project.remove(id)
          res.json(projectId)
          next()
        }
    } catch(err) {
      next(err)
    }
});

router.get('/:id/actions', validateProjectId, (req, res, next) => {
    const { id } = req.params
    Project.getProjectActions(id)
    .then(project => res.json(project))
    .catch(err => next(err))
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(500).json({
      message: "Something died in projects-router.",
      error: err.message
    });
  });

module.exports = router;