const parser = require('csv-parser')
const { Transform } = require('json2csv')
const { Readable } = require('stream')
const { Territory } = require('../db/models')

exports.save = options => {
  const stream = new Readable()
  stream.push(options.buffer)
  stream.push(null)
  return new Promise((res, rej) => {
    let results = []
    stream
      .pipe(parser())
      .on('data', data => {
        const territory = new Territory(data)
        territory.save()
      })
      .on('error', () => rej('error with parsing csv file'))
      .on('end', () => {
        res(results)
      })
  })
}

exports.generate = options => {
  const stream = new Readable({ objectMode: true })
  stream._read = () => {}
  Territory.streamFetchAll()
    .on('error', err => console.log(err))
    .on('result', row => stream.push(row))
    .on('end', () => stream.push(null))

  options.res.attachment('data.csv')
  const json2csv = new Transform({}, { objectMode: true })
  stream
    .pipe(json2csv)
    .pipe(options.res)
    .on('error', () => console.log('error with downloading csv file'))
    .on('finish', () => {
      console.log('finish')
    })
}

/* Used for Split feature if needed */
exports.split = options => {
  const { records, limit } = options

  const partitions = Math.ceil(records.length / limit)

  let result = []
  let i = 0
  while (i < partitions) {
    result.push(records.slice(i * limit, (i + 1) * limit + 1))
    i++
  }
  return result
}
