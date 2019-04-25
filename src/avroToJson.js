'use strict'

const _ = require('lodash')
const debug = require('debug')('json-to-avro:avroToJson')

const { isValid } = require('./utils')
const { jsonToAvro } = require('./jsonToAvro')
const baseTypeConversions = {
  string: value => {
    return value
  },
  boolean: value => {
    return value
  },
  long: value => {
    return value
  },
  int: value => {
    return value
  },
}

function checkRecord(schema, record, avroParseOptions) {
  debug('checkRecord schema', JSON.stringify(schema))
  debug('checkRecord record', JSON.stringify(record))
  debug('checkRecord avroParseOptions', JSON.stringify(avroParseOptions))
  if (!isValid(schema, record, avroParseOptions))
    throw new Error(
      'The record that you passed in isnt valid according to the avro schema you passed in.',
    )
}

function avroToJson(schema, record, avroParseOptions) {
  const jsonDoc = processRecord(record, schema)
  record =
    avroParseOptions && !avroParseOptions.wrapUnions
      ? jsonDoc
      : jsonToAvro(schema, jsonDoc)
  checkRecord(schema, record, avroParseOptions)
  return jsonDoc
}

function processRecord(record, schema) {
  const { fields } = schema

  const processedFields = _.reduce(
    fields,
    (m, field) => {
      const processedField = processField(record[field.name], field)
      return _.assign(processedField, m)
    },
    {},
  )
  return processedFields
}

function processField(field, { name, type }) {
  if (_.isNil(field)) {
    if (Array.isArray(type) && _.indexOf(type, 'null') !== -1) {
      return field
    }
    throw new Error(
      `Found a null value at ${name} in your record where that isnt allowed, expecting: ${JSON.stringify(
        type,
      )}`,
    )
  }

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
  const nonNullTypes = _.without(types, 'null')

  const results = _.compact(
    _.map(nonNullTypes, type => {
      if (type.type === 'enum')
        return field[type.name] !== undefined ? field[type.name] : field

      if (typeof type === 'object' && type.type && type.type === 'record')
        return processRecord(field[type.name], type)
      try {
        return processField(field[type], { type })
      } catch (error) {}
    }),
  )
  return results[0]
}

module.exports = {
  avroToJson,
  checkRecord,
  processRecord,
  processField,
  processUnion,
  processArrayType,
}
