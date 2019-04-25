'use strict'

const avsc = require('avsc')
const debug = require('debug')('json-to-avro:utils')

function isValid(schema, avro, avroParseOptions = { wrapUnions: true }) {
  let isValid = false
  try {
    const SchemaType = avsc.parse(schema, avroParseOptions)
    isValid = SchemaType.isValid(avro)
  } catch (error) {
    if (
      !avroParseOptions.wrapUnions &&
      error.message.includes('ambiguous unwrapped union')
    ) {
      debug(
        'Found ambiguous unwrapped union, passing this record as valid',
        JSON.stringify(avro),
      )
      isValid = true
    }
  }
  return isValid
}
module.exports = {
  isValid,
}
