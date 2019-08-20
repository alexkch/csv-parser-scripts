const app = require('express')()

app.listen('8080')
console.log("app listening on port '8080'")
require('./routes')(app)
