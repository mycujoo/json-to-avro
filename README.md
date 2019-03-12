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

If you create a schema that holds a structure like in the example down below, with an array of items that holds multiple different record types as options, the items in the converted json will receive an extra field ```__type``` with the name of the record type as value. If we don't add this field you will not be able to differentiate between the record types in the actions array.


```json
{
  "name": "actions",
  "doc": "List of actions to be executed for this annotation",
  "type": {
    "type": "array",
    "items": [
      {
        "name": "UiScoreboardVisibilityAction",
        "type": "record",
        "doc": "action for changing Scoreboard visibility",
        "fields": [
          {
            "name": "visible",
            "doc": "Defines the visibility status for scoreboard",
            "type": "boolean"
          }
        ]
      },
      {
        "name": "UiTimerVisibilityAction",
        "type": "record",
        "doc": "action for changing Timer visibility",
        "fields": [
          {
            "name": "visible",
            "doc": "Defines the visibility status for timer",
            "type": "boolean"
          }
        ]
      }
    ]
  }
}

// Avro serializable json
{
  "actions": [
    {
      "UiTimerVisibilityAction": {
        "visible": true
      }
    },
    {
      "UiScoreboardVisibilityAction": {
        "visible": true
      }
    }
  ]  
}
// Plain parsed json
{
  "actions": [
    {
      "visible": true
    },
    {
      "visible": true
    }
  ]
}

// Parsed by avro to json.
{
  "actions": [
    {
      "__type": "UiTimerVisibilityAction",
      "visible": true
    },
    {
      "__type": "UiScoreboardVisibilityAction",
      "visible": true
    }
  ]
}

```

Vice versa, if you want to convert plain JSON to avro, you must add the ```__type``` field to be in sync the record type name.