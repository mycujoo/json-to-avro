'use strict'

const _ = require('lodash')

function JSONToAvro(schema, json) {
  const res = processRecord(json, schema)
  const doc = res[schema.name]
  return doc
}

function processField(json, { name, doc, type }) {
  const options = {
    string: value => {
      return value
    },
    enum: (value, type) => {
      const obj = {}
      obj[type.name] = value
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

  const option = options[type]

  if (option) {
    const obj = {}
    obj[name] = options[type](json, type)
    return obj
  }
  if (Array.isArray(type)) {
    const obj = {}
    obj[name] = processArrayType(json, type)
    return obj
  }
  if (typeof type === 'object' && type.type) {
    if (type.type === 'record') {
      const obj = {}
      if (type.items) {
        obj[name] = _.map(type.items, processRecord.bind(json))
      } else {
        const rec = processRecord(json, type)
        obj[name] = rec[type.name]
      }
      return obj
    }

    if (type.type === 'array') {
      const obj = {}
      if (!Array.isArray(type.items)) {
        obj[name] = _.map(json, item => {
          const rec = processRecord(item, type.items)
          return rec[type.items.name]
        })
        return obj
      }
      obj[name] = _.map(json, processUnions.bind(null, type.items))
      return obj
    }

    if (type.type === 'enum') {
      const obj = {}
      // const enumDoc = {}
      // enumDoc[type.name] = json
      obj[name] = json
      return obj
    }
  }
  const obj = {}
  // const subDoc = {}
  // subDoc[type] = json
  obj[name] = json
  return obj
  // throw new Error(`Found an unknown avro type: ${JSON.stringify(type)}`)
}

function processUnions(unionTypes, jsonItem) {
  const unionType = _.find(unionTypes, ({ name }) => {
    return name === jsonItem.__type
  })

  const res = processRecord(_.omit(jsonItem, '__type'), unionType)

  return res
}

function processRecord(json, { type, name, doc, fields }) {
  const obj = {}
  obj[name] = _.reduce(
    fields,
    (m, field) => {
      const res = processField(json[field.name], field)
      return _.assign(res, m)
    },
    {},
  )
  return obj
}

function processArrayType(json, array) {
  if (!json) {
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
    const obj = {}
    if (typeof nulllessArray[0] !== 'object') obj[nulllessArray[0]] = json
    else {
      if (nulllessArray[0].type === 'enum') {
        obj[nulllessArray[0].name] = json
        return obj
      }
      return processRecord(json, nulllessArray[0])
    }
    return obj
  }
  throw new Error('omg we have a bigger array then expected')
}

module.exports = {
  JSONToAvro,
  processField,
  processUnions,
  processRecord,
  processArrayType,
}
