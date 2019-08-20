const db = require('../setup').promise()
const stream = require('../setup')

module.exports = class Record {
  constructor({ id = null, identifier = null }) {
    this.id = id
    this.identifier = identifier
  }

  save() {
    return db.execute(
      `INSERT INTO territories ` + `(identifier)` + `VALUES (?)`,
      [this.identifier]
    )
  }

  static streamFetchAll() {
    return stream.query(`SELECT * FROM territories`)
  }
}
