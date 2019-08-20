const express = require('express')
const multer = require('multer')
const {
  homeController,
  uploadController,
  downloadController
} = require('./controllers')

module.exports = app => {
  app.set('view engine', 'ejs')
  app.set('views', 'views')
  app.use(
    multer({
      fileFilter: (req, file, cb) => {
        if (file.mimetype === 'text/csv') {
          cb(null, true)
        } else {
          cb(null, false)
        }
      }
    }).array('csv', 7)
  )
  app.use(express.json())
  app.use('/', homeController)
  app.use('/upload', uploadController)
  app.use('/download', downloadController)
  //app.use(error)
}
