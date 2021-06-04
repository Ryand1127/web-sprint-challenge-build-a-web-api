// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const Action = require('./actions-model.js')

const { validateActionId, validateAction } = require('./../middleware/middleware')

router.get('/', (req, res, next) => {
    Action.get()
    .then((actions) => res.json(actions))
    .catch((err) => next(err));
})

router.get('/:id', validateActionId, (req, res) => {
    res.json(req.action)
})

router.post('/', validateAction, (req, res, next) => {
    Action.insert(req.body)
    .then(({id}) => {
        return Action.get(id)
      })
    .then(action => res.status(201).json(action))
    .catch(err => next(err))
})

router.put('/:id', validateActionId, validateAction, (req, res, next) => {
    const id = req.params.id
    const body = req.body
    Action.get(id)
      .then(() => {
        return Action.update(id, body)
      })
      .then(() => {
        return Action.get(id)
      })
    .then(action => res.json(action))
    .catch(err => next(err))
});

router.delete('/:id', validateActionId, async (req, res, next) => {
    try {
      const id = req.params.id
      const actionId = await Action.get(id)
        if(actionId) {
          await Action.remove(id)
          res.json(actionId)
          next()
        }
    } catch(err) {
      next(err)
    }
});

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(500).json({
      message: "Something died in actions router.",
      error: err.message
    });
  });

module.exports = router;