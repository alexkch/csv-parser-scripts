const router = require('express').Router()
const HttpStatus = require('http-status-codes')
const fs = require('fs')
const { csvSqlService } = require('../services')
const { Territory } = require('../db/models')

router.get('/', (req, res, next) => {
  csvSqlService.generate({ res: res })
})

router.get('/all', (req, res, next) => {
  Territory.fetchAll().then(([territory]) => {
    console.log(territory.length)
    console.log(territory[3])
    console.log(territory[0])
    console.log(territory[4])
  })
  res.status(HttpStatus.OK).send('OK')
})

module.exports = router
