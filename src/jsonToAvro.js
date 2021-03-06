'use strict'

const _ = require('lodash')

const { isValid } = require('./utils')

const baseTypeConversions = {
  string: value => {
    if (typeof value !== 'string') return
    return value
  },
  boolean: value => {
    if (typeof value !== 'boolean') return
    return value
  },
  long: value => {
    if (typeof value !== 'number') return
    return value
  },
  double: value => {
    if (typeof value !== 'number') return
    return value
  },
  int: value => {
    if (typeof value !== 'number') return
    return value
  },
}

function checkRecord(schema, record, avroParseOptions) {
  if (!isValid(schema, record, avroParseOptions)) {
    throw new Error(
      'The record that was generated isnt valid according to the avro schema you passed in!',
    )
  }
}

function jsonToAvro(schema, json, avroParseOptions) {
  const processedRecord = processRecord(json, schema)
  const record = processedRecord[schema.name]
  checkRecord(schema, record, avroParseOptions)
  return record
}

function processRecord(json, { name, fields }) {
  if (!json) return

  const processedRecord = {}

  processedRecord[name] = _.reduce(
    fields,
    (m, field) => {
      const processedField = processField(json[field.name], field)
      return _.assign(processedField, m)
    },
    {},
  )

  return processedRecord
}

function processField(json, { name, type }) {
  const baseTypeConversion = baseTypeConversions[type]
  const processedField = {}

  if (baseTypeConversion) {
    const processedBaseType = baseTypeConversion(json, type)
    if (_.isNil(processedBaseType)) {
      throw new Error(
        `Received null as a value for field ${name}, expecting ${type}`,
      )
    }
    processedField[name] = processedBaseType
    return processedField
  }

  if (Array.isArray(type)) {
    processedField[name] = processArrayType(json, type, name)
    return processedField
  }

  if (typeof type === 'object' && type.type) {
    if (type.type === 'record') {
      const processedRecord = processRecord(json, type)
      processedField[name] = processedRecord[type.name]
      return processedField
    }
    if (type.type === 'array') {
      if (Array.isArray(type.items)) {
        processedField[name] = _.map(json, processUnions.bind(null, type.items))
      } else if (typeof type.items !== 'object') {
        processedField[name] = json
      } else {
        processedField[name] = _.map(json, item => {
          const rec = processRecord(item, type.items)
          return rec[type.items.name]
        })
      }
      return processedField
    }
  }

  processedField[name] = json
  return processedField
}

function processUnions(unionTypes, json) {
  // TODO Make the __type field name configurarable
  const unionType = _.find(unionTypes, ({ name }) => {
    return name === json.__type
  })

  return processRecord(_.omit(json, '__type'), unionType)
}

function processArrayType(json, types, name) {
  const nonNullTypes = _.without(types, 'null')

  const results = _.compact(
    _.map(nonNullTypes, type => {
      const processedArrayType = {}

      if (typeof type !== 'object') {
        try {
          const processedField = processField(json, { type, name })
          processedArrayType[type] = processedField[name]
          return processedArrayType
        } catch (error) {}
      } else {
        if (type.type === 'enum') {
          if (_.isNil(json)) return
          processedArrayType[type.name] = json
          return processedArrayType
        }
        return processRecord(json, type)
      }
    }),
  )

  if (results.length) return results[0]
  return null
}

module.exports = {
  jsonToAvro,
  checkRecord,
  processField,
  processUnions,
  processRecord,
  processArrayType,
}
