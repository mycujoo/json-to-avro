# json-to-avro

TODO:
Implement configure the key that is used to set and detect custom union multi record typed types.

## Json to avro

To convert plain JSON to avro-serializable JSON, supply the avro schema in JSON format e.g:

```javascript
const { jsonToAvro } = require('json-to-avro')

const AvroSchema = {
  type: 'record',
  name: 'test',
  fields: [
    {
      name: 'id',
      type: 'string',
      doc: 'test doc id',
    },
    {
      name: 'value',
      type: ['string', 'null'],
      default: '',
      doc: 'random value',
    },
    {
      doc: 'list of values',
      name: 'valuess',
      type: {
        type: 'array',
        items: 'string',
      },
    },
  ],
}

const JSONRecord = {
  id: 'abc1q24',
  value: 'value2',
  valuess: ['value4', 'value3'],
}

const avroRecord = jsonToAvro(AvroSchema, JSONRecord)

// avroRecord = {
//   valuess: ['value4', 'value3'],
//   value: { string: 'value2' },
//   id: 'abc1q24',
// }
```
## Avro to json

And vice versa.

```javascript
const { avroToJson } = require('json-to-avro')

const AvroSchema = {
  type: 'record',
  name: 'test',
  fields: [
    {
      name: 'id',
      type: 'string',
      doc: 'test doc id',
    },
    {
      name: 'value',
      type: ['string', 'null'],
      default: '',
      doc: 'random value',
    },
    {
      doc: 'list of values',
      name: 'valuess',
      type: {
        type: 'array',
        items: 'string',
      },
    },
  ],
}

const AvroRecord = {
  valuess: ['value4', 'value3'],
  value: { string: 'value2' },
  id: 'abc1q24',
}

const JSONRecord = avroToJson(AvroSchema, AvroRecord)

// JSONRecord = {
//   id: 'abc1q24',
//   value: 'value2',
//   valuess: ['value4', 'value3'],
// }

```

## Note

If you create a schema that holds a structure like this with an array of items with multiple record types as option, the JSON items in the array, in this example actions, will have a field ```__type``` with the name of the record type. Vice versa, if you want to convert plain JSON to avro, you must configure the ```__type``` field to be in sync the record type name.
```json
{
  "name": "actions",
  "doc": "List of actions to be executed for this annotation",
  "type": {
    "type": "array",
    "items": [
      {
        "name": "PlayerChangeAction",
        "type": "record",
        "doc": "action for changing player",
        "fields": [
          {
            "name": "type",
            "doc": "The type of the player change",
            "type": {
              "name": "PlayerChangeTypeEnum",
              "type": "enum",
              "symbols": [
                "removed",
                "added"
              ]
            }
          },
          {
            "name": "personId",
            "type": "string",
            "doc": "ID of the person related to the action"
          }
        ]
      },
      {
        "name": "ScoreChangeAction",
        "type": "record",
        "doc": "action for changing score",
        "fields": [
          {
            "name": "type",
            "doc": "The type of the score change",
            "type": {
              "name": "ScoreChangeTypeEnum",
              "type": "enum",
              "symbols": [
                "increased",
                "decreased"
              ]
            }
          },
          {
            "name": "team",
            "type": "TeamEnum"
          }
        ]
      }
    ]
  }
}
``