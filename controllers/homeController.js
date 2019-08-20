const router = require('express').Router()
const HttpStatus = require('http-status-codes')

router.get('/', (req, res, next) => {
  res.render('home')
})

module.exports = router
