const Action = require('../actions/actions-model')
const Project = require('../projects/projects-model')

function logger(req, res, next) {
    console.log(
      `Request Method: ${req.method}, Request URL: ${req.url}, Time Stamp: ${Date.now()}`
    )
  }

module.exports = {
    logger
}