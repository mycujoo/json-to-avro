'use strict'

const avsc = require('avsc')

function isValid(schema, avro) {
  const SchemaType = avsc.parse(schema, {
    wrapUnions: true,
  })

  return SchemaType.isValid(avro)
}
module.exports = {
  isValid,
}
