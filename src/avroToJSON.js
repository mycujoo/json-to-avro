'use strict'

const _ = require('lodash')

const { isValid } = require('./utils')

function checkAvro(schema, avro) {
  if (!isValid(schema, avro))
    throw new Error(
      'The avro data that you passed in isnt valid according to the schema you passed in.',
    )
}

function avroToJSON(schema, avro) {
  checkAvro(schema, avro)
  const processedRecord = processRecord({ avro, schema })
  const jsonDoc = processedRecord[schema.name]
  return jsonDoc
}

function processRecord({ avro, schema }) {
  const { name, fields } = schema

  const processedFields = _.reduce(
    fields,
    (processedFields, field) => {
      const processedField = processField(avro[field.name], field)
      return _.assign(processedField, processedFields)
    },
    {},
  )

  const obj = {}
  obj[name] = processedFields
  return obj
}

function processField(avro, { name, doc, type }) {
  if (_.isNil(avro)) return avro

  const options = {
    string: value => {
      return value.string || value
    },
    enum: (value, type) => {
      const obj = {}
      obj[type.name] = value
    },
    boolean: value => {
      return value.boolean || value
    },
    long: value => {
      return value.long || value
    },
    int: value => {
      return value.int || value
    },
  }

  const option = options[type]

  if (option) {
    const value = options[type](avro, type)
    if (!name) return value
    const obj = {}
    obj[name] = value
    return obj
  }

  if (Array.isArray(type)) {
    const obj = {}
    obj[name] = processArrayType(avro, type)
    return obj
  }

  if (typeof type === 'object') {
    if (type.type === 'record') {
      const res = processRecord({ avro, schema: type })
      const doc = {}
      doc[name] = res[type.name]
      return doc
    }
    if (type.type === 'array') {
      if (Array.isArray(type.items)) {
        const res = _.map(avro, item => {
          return processUnions(item, type.items)
        })
        const obj = {}
        obj[name] = res

        return obj
      } else if (typeof type.items === 'object') {
        const res = _.map(avro, item => {
          const rec = processRecord({ avro: item, schema: type.items })
          return rec[type.items.name]
        })
        const obj = {}
        obj[name] = res
        return obj
      }
    }
  }

  const obj = {}
  obj[name] = avro
  return obj
}

function processUnions(avro, unionTypes) {
  if (typeof avro === 'object' && avro.Branch$) avro = avro.Branch$
  const union = _.find(unionTypes, ({ name }) => {
    if (avro[name]) return true
  })
  const rec = avro[union.name]
  const res = processRecord({ avro: rec, schema: union })
  const doc = res[union.name]
  doc.__type = union.name
  return doc
}

function processArrayType(avro, array) {
  if (typeof avro === 'object' && avro.Branch$) avro = avro.Branch$
  if (!avro) {
    if (
      !_.some(array, item => {
        return item === 'null'
      })
    )
      throw new Error(
        `Found a null value where that isnt allowed, expecting: ${JSON.stringify(
          array,
        )}`,
      )
    return null
  }

  const nulllessArray = _.without(array, 'null')

  if (nulllessArray.length === 1) {
    let value
    if (nulllessArray[0].type === 'enum') {
      return avro[nulllessArray[0].name]
    }
    if (
      typeof nulllessArray[0] === 'object' &&
      nulllessArray[0].type &&
      nulllessArray[0].type === 'record'
    ) {
      value = processRecord({
        avro: avro[nulllessArray[0].name],
        schema: nulllessArray[0],
      })[nulllessArray[0].name]
    } else
      value = processField(avro[nulllessArray[0]], {
        type: nulllessArray[0],
      })

    return value
  }
  return console.error('omg we have a bigger array then expected')
}

module.exports = {
  avroToJSON,
  isValid,
  processRecord,
  processField,
  processUnions,
  processArrayType,
}
