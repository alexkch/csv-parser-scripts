const router = require('express').Router()
const HttpStatus = require('http-status-codes')
const { csvSqlService } = require('../services')

router.post('/', (req, res, next) => {
  if (!req.file) {
    res.status(HttpStatus.UNPROCESSABLE_ENTITY).send('Unprocessable file')
  } else {
    csvSqlService.save({ buffer: file.buffer }).then(result => {
      console.log(result)
      res.status(HttpStatus.OK).send('OK')
    })
  }
})

/* Multi upload files feature */
// router.post('/multi', (req, res, next) => {
//   if (!req.files || req.files.length === 0) {
//     res.status(HttpStatus.UNPROCESSABLE_ENTITY).send('Unprocessable file')
//   } else {
//     req.files.map(file => {
//       csvSqlService.save({ buffer: file.buffer }).then(result => {
//         console.log(result)
//         //res.status(HttpStatus.OK).send('OK')
//       })
//     })
//   }
// })

module.exports = router
