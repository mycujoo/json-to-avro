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

function checkRecord(schema, record) {
  if (!isValid(schema, record))
    throw new Error(
      'The record that you passed in isnt valid according to the avro schema you passed in.',
    )
}

function avroToJSON(schema, record) {
  checkRecord(schema, record)
  return processRecord(record, schema)
}

function processRecord(record, schema) {
  const { fields } = schema

  const processedFields = _.reduce(
    fields,
    (processedFields, field) => {
      const processedField = processField(record[field.name], field)
      return _.assign(processedField, processedFields)
    },
    {},
  )
  return processedFields
}

function processField(field, { name, type }) {
  if (_.isNil(field)) return field

  const processedField = {}

  const processBaseType = baseTypeConversions[type]

  if (processBaseType) {
    const processedBaseType = processBaseType(field, type)
    if (!name) return processedBaseType
    processedField[name] = processedBaseType
    return processedField
  }

  if (Array.isArray(type)) {
    processedField[name] = processArrayType(field, type)
    return processedField
  }

  if (typeof type === 'object') {
    if (type.type === 'record') {
      processedField[name] = processRecord(field, type)
      return processedField
    }
    if (type.type === 'array') {
      if (Array.isArray(type.items)) {
        const processedUnions = _.map(field, item => {
          return processUnion(item, type.items)
        })
        processedField[name] = processedUnions

        return processedField
      } else if (typeof type.items === 'object') {
        const processedRecords = _.map(field, item => {
          return processRecord(item, type.items)
        })
        processedField[name] = processedRecords
        return processedField
      }
    }
  }

  processedField[name] = field
  return processedField
}

function processUnion(union, unionTypes) {
  const unionType = _.find(unionTypes, ({ name }) => {
    if (union[name]) return true
  })
  const record = union[unionType.name]
  const processedRecord = processRecord(record, unionType)
  // Make field __type configurable
  processedRecord.__type = unionType.name
  return processedRecord
}

function processArrayType(field, types) {
  if (!field) {
    if (
      !_.some(types, type => {
        return type === 'null'
      })
    )
      throw new Error(
        `Found a null value in your record where that isnt allowed, expecting one of: ${JSON.stringify(
          types,
        )}`,
      )
    return null
  }

  const nonNullableTypes = _.without(types, 'null')

  if (nonNullableTypes.length !== 1)
    throw new Error(
      `Received more type options then expected ${JSON.stringify(types)}`,
    )

  const nonNullableType = nonNullableTypes[0]

  if (nonNullableType.type === 'enum') return field[nonNullableType.name]

  if (
    typeof nonNullableType === 'object' &&
    nonNullableType.type &&
    nonNullableType.type === 'record'
  )
    return processRecord(field[nonNullableType.name], nonNullableType)

  return processField(field[nonNullableType], {
    type: nonNullableType,
  })
}

module.exports = {
  avroToJSON,
  isValid,
  processRecord,
  processField,
  processUnion,
  processArrayType,
}
