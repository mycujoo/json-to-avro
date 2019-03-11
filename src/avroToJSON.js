'use strict'

const _ = require('lodash')

const { isValid } = require('./utils')

const baseTypeConversions = {
  string: value => {
    return value.string || value
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

function checkAvro(schema, avro) {
  if (!isValid(schema, avro))
    throw new Error(
      'The avro data that you passed in isnt valid according to the schema you passed in.',
    )
}

function avroToJSON(schema, avro) {
  checkAvro(schema, avro)
  return processRecord({ avro, schema })
}

function processRecord({ avro, schema }) {
  const { fields } = schema

  const processedFields = _.reduce(
    fields,
    (processedFields, field) => {
      const processedField = processField(avro[field.name], field)
      return _.assign(processedField, processedFields)
    },
    {},
  )
  return processedFields
}

function processField(avro, { name, doc, type }) {
  if (_.isNil(avro)) return avro

  const processedField = {}

  const processBaseType = baseTypeConversions[type]

  if (processBaseType) {
    const processedBaseType = processBaseType(avro, type)
    if (!name) return processedBaseType
    processedField[name] = processedBaseType
    return processedField
  }

  if (Array.isArray(type)) {
    processedField[name] = processArrayType(avro, type)
    return processedField
  }

  if (typeof type === 'object') {
    if (type.type === 'record') {
      processedField[name] = processRecord({ avro, schema: type })
      return processedField
    }
    if (type.type === 'array') {
      if (Array.isArray(type.items)) {
        const processedUnions = _.map(avro, item => {
          return processUnions(item, type.items)
        })
        processedField[name] = processedUnions

        return processedField
      } else if (typeof type.items === 'object') {
        const processedRecords = _.map(avro, item => {
          return processRecord({ avro: item, schema: type.items })
        })
        processedField[name] = processedRecords
        return processedField
      }
    }
  }

  processedField[name] = avro
  return processedField
}

function processUnions(avro, unionTypes) {
  const union = _.find(unionTypes, ({ name }) => {
    if (avro[name]) return true
  })
  const record = avro[union.name]
  const processedRecord = processRecord({ avro: record, schema: union })
  processedRecord.__type = union.name
  return processedRecord
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
      })
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
