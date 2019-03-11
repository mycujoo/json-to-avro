'use strict'
const _ = require('lodash')
const { avroToJSON, JSONToAvro } = require('../')

const hl = require('../__mocks__/AvroHighlight.json')
const season = require('../__mocks__/AvroSeason.json')

describe.only('Avro schema to mongoose tests', () => {
  test('It should convert the season doc properly to json', () => {
    const convertedSeason = avroToJSON(
      require('../__mocks__/seasonschema.json'),
      season,
    )
    expect(convertedSeason).toEqual({
      id: 'cjsg44vwp0001cr88mfe3kkep',
      internationalName: 'Super season',
      competitionId: 'cjsg44vyf0004cr88qro9k8mv',
      localName: 'Best season',
      logoUrl: 'http://logo.com',
      dateFrom: 12312,
      dateTo: 12313,
      numberOfParticipants: 12315,
      current: true,
      format: 'cup',
      teams: ['cjsg44vyf0004cr88qro9k8mv', 'cjsg44vyf0005cr88k2b7b9pc'],
      eventId: 'cjsg44vyf0004cr88qro9k8mv',
      traceToken: 'cjsg44vyf0005cr88k2b7b9pc',
      createdAt: 1550843428551,
    })
  })

  test('It should convert the HL doc properly to json', () => {
    const convertedHiglight = avroToJSON(
      require('../__mocks__/highlightschema'),
      hl,
    )
    expect(convertedHiglight).toEqual({
      _id: 'cjsg44vwp0001cr88mfe3kkep',
      event: {
        id: 'cjsg44vst0000cr88768nlnfz',
      },
      annotations: [
        {
          id: 'cjsg44vxp0002cr88iuh3ymff',
          elapsedTime: 10,
          type: 'goal',
          team: 'home',
          actions: [
            {
              __type: 'ScoreChangeAction',
              type: 'increased',
              team: 'home',
            },
          ],
          createdAt: 1550843428526,
        },
      ],
      video: { position: 10, duration: 500 },
      primaryAnnotationId: 'cjsg44vxp0002cr88iuh3ymff',
      deleted: false,
      eventId: 'cjsg44vyf0004cr88qro9k8mv',
      traceToken: 'cjsg44vyf0005cr88k2b7b9pc',
      createdAt: 1550843428551,
    })
  })

  test('It should convert a highlight to avro', () => {
    const hl = {
      _id: 'cjsg44vwp0001cr88mfe3kkep',
      event: {
        id: 'cjsg44vst0000cr88768nlnfz',
      },
      annotations: [
        {
          id: 'cjsg44vxp0002cr88iuh3ymff',
          elapsedTime: 10,
          type: 'goal',
          team: 'home',
          personId: null,
          actions: [
            {
              __type: 'ScoreChangeAction',
              type: 'increased',
              team: 'home',
            },
          ],
          createdAt: 1550843428526,
        },
      ],
      video: { position: 10, duration: 500, videoUrl: null, imageUrl: null },
      primaryAnnotationId: 'cjsg44vxp0002cr88iuh3ymff',
      deleted: false,
      eventId: 'cjsg44vyf0004cr88qro9k8mv',
      traceToken: 'cjsg44vyf0005cr88k2b7b9pc',
      createdAt: 1550843428551,
    }
    const avroHighlight = JSONToAvro(
      require('../__mocks__/highlightschema'),
      hl,
    )
    expect(avroHighlight).toEqual({
      createdAt: 1550843428551,
      traceToken: 'cjsg44vyf0005cr88k2b7b9pc',
      eventId: 'cjsg44vyf0004cr88qro9k8mv',
      deleted: false,
      primaryAnnotationId: {
        string: 'cjsg44vxp0002cr88iuh3ymff',
      },
      video: {
        HighlightVideoRecord: {
          imageUrl: null,
          videoUrl: null,
          duration: 500,
          position: 10,
        },
      },
      annotations: [
        {
          createdAt: 1550843428526,
          actions: [
            {
              ScoreChangeAction: {
                team: 'home',
                type: 'increased',
              },
            },
          ],
          personId: null,
          team: { TeamEnum: 'home' },
          type: { FootballAnnotationTypeEnum: 'goal' },
          elapsedTime: 10,
          id: 'cjsg44vxp0002cr88iuh3ymff',
        },
      ],
      event: { id: 'cjsg44vst0000cr88768nlnfz' },
      _id: 'cjsg44vwp0001cr88mfe3kkep',
    })
  })

  test('It should convert another highlight to avro', () => {
    const hl = {
      _id: 'cjsg44vwp0001cr88mfe3kkep',
      event: {
        id: 'cjsg44vst0000cr88768nlnfz',
      },
      annotations: [
        {
          id: 'cjsg44vxp0002cr88iuh3ymff',
          elapsedTime: 10,
          type: 'goal',
          team: 'home',
          personId: null,
          actions: [],
          createdAt: 1550843428526,
        },
      ],
      video: { position: 10, duration: 500, videoUrl: null, imageUrl: null },
      primaryAnnotationId: 'cjsg44vxp0002cr88iuh3ymff',
      deleted: false,
      eventId: 'cjsg44vyf0004cr88qro9k8mv',
      traceToken: 'cjsg44vyf0005cr88k2b7b9pc',
      createdAt: 1550843428551,
    }
    const avroHighlight = JSONToAvro(
      require('../__mocks__/highlightschema'),
      hl,
    )
    expect(avroHighlight).toEqual({
      createdAt: 1550843428551,
      traceToken: 'cjsg44vyf0005cr88k2b7b9pc',
      eventId: 'cjsg44vyf0004cr88qro9k8mv',
      deleted: false,
      primaryAnnotationId: {
        string: 'cjsg44vxp0002cr88iuh3ymff',
      },
      video: {
        HighlightVideoRecord: {
          imageUrl: null,
          videoUrl: null,
          duration: 500,
          position: 10,
        },
      },
      annotations: [
        {
          createdAt: 1550843428526,
          actions: [],
          personId: null,
          team: { TeamEnum: 'home' },
          type: { FootballAnnotationTypeEnum: 'goal' },
          elapsedTime: 10,
          id: 'cjsg44vxp0002cr88iuh3ymff',
        },
      ],
      event: { id: 'cjsg44vst0000cr88768nlnfz' },
      _id: 'cjsg44vwp0001cr88mfe3kkep',
    })
  })

  test('It should convert one more highlight to avro', () => {
    const hl = {
      _id: 'cjsg44vwp0001cr88mfe3kkep',
      event: {
        id: 'cjsg44vst0000cr88768nlnfz',
      },
      annotations: [],
      video: { position: 10, duration: 500, videoUrl: null, imageUrl: null },
      primaryAnnotationId: 'cjsg44vxp0002cr88iuh3ymff',
      deleted: false,
      eventId: 'cjsg44vyf0004cr88qro9k8mv',
      traceToken: 'cjsg44vyf0005cr88k2b7b9pc',
      createdAt: 1550843428551,
    }
    const avroHighlight = JSONToAvro(
      require('../__mocks__/highlightschema'),
      hl,
    )
    expect(avroHighlight).toEqual({
      createdAt: 1550843428551,
      traceToken: 'cjsg44vyf0005cr88k2b7b9pc',
      eventId: 'cjsg44vyf0004cr88qro9k8mv',
      deleted: false,
      primaryAnnotationId: {
        string: 'cjsg44vxp0002cr88iuh3ymff',
      },
      video: {
        HighlightVideoRecord: {
          imageUrl: null,
          videoUrl: null,
          duration: 500,
          position: 10,
        },
      },
      annotations: [],
      event: { id: 'cjsg44vst0000cr88768nlnfz' },
      _id: 'cjsg44vwp0001cr88mfe3kkep',
    })
  })

  test('It should convert a highligh with multiple actions to avro', () => {
    const hl = {
      _id: 'cjsg44vwp0001cr88mfe3kkep',
      event: {
        id: 'cjsg44vst0000cr88768nlnfz',
      },
      annotations: [
        {
          id: 'cjsg44vxp0002cr88iuh3ymff',
          elapsedTime: 10,
          type: 'goal',
          team: 'home',
          actions: [
            {
              __type: 'ScoreChangeAction',
              type: 'increased',
              team: 'home',
            },
            {
              __type: 'UiScoreboardVisibilityAction',
              visible: true,
            },
          ],
          createdAt: 1550843428526,
        },
      ],
      video: { position: 10, duration: 500 },
      primaryAnnotationId: 'cjsg44vxp0002cr88iuh3ymff',
      deleted: false,
      eventId: 'cjsg44vyf0004cr88qro9k8mv',
      traceToken: 'cjsg44vyf0005cr88k2b7b9pc',
      createdAt: 1550843428551,
    }

    const avroHighlight = JSONToAvro(
      require('../__mocks__/highlightschema'),
      hl,
    )

    expect(avroHighlight).toEqual({
      createdAt: 1550843428551,
      traceToken: 'cjsg44vyf0005cr88k2b7b9pc',
      eventId: 'cjsg44vyf0004cr88qro9k8mv',
      deleted: false,
      primaryAnnotationId: {
        string: 'cjsg44vxp0002cr88iuh3ymff',
      },
      video: {
        HighlightVideoRecord: {
          imageUrl: null,
          videoUrl: null,
          duration: 500,
          position: 10,
        },
      },
      annotations: [
        {
          createdAt: 1550843428526,
          actions: [
            {
              ScoreChangeAction: {
                team: 'home',
                type: 'increased',
              },
            },
            {
              UiScoreboardVisibilityAction: {
                visible: true,
              },
            },
          ],
          personId: null,
          team: { TeamEnum: 'home' },
          type: { FootballAnnotationTypeEnum: 'goal' },
          elapsedTime: 10,
          id: 'cjsg44vxp0002cr88iuh3ymff',
        },
      ],
      event: { id: 'cjsg44vst0000cr88768nlnfz' },
      _id: 'cjsg44vwp0001cr88mfe3kkep',
    })

    const jsonHighlight = avroToJSON(
      require('../__mocks__/highlightschema'),
      avroHighlight,
    )

    expect(jsonHighlight).toEqual(_.omitBy(hl, _.isNil))
  })

  test('It should convert a highligh with multiple annotations and actions to avro', () => {
    const hl = {
      _id: 'cjsg44vwp0001cr88mfe3kkep',
      event: {
        id: 'cjsg44vst0000cr88768nlnfz',
      },
      annotations: [
        {
          id: 'cjsg44vxp0002cr88iuh3ymff',
          elapsedTime: 10,
          type: 'goal',
          team: 'home',
          personId: null,
          actions: [
            {
              __type: 'ScoreChangeAction',
              type: 'increased',
              team: 'home',
            },
            {
              __type: 'UiScoreboardVisibilityAction',
              visible: true,
            },
          ],
          createdAt: 1550843428526,
        },
        {
          id: 'cjsg44vxp0002cr88iuh3ymfh',
          elapsedTime: 10,
          type: 'penalty',
          team: 'home',
          personId: 'personid1234',
          actions: [
            {
              __type: 'UiTimerVisibilityAction',
              visible: true,
            },
          ],
          createdAt: 1550843428526,
        },
      ],
      video: { position: 10, duration: 500, videoUrl: null, imageUrl: null },
      primaryAnnotationId: 'cjsg44vxp0002cr88iuh3ymff',
      deleted: false,
      eventId: 'cjsg44vyf0004cr88qro9k8mv',
      traceToken: 'cjsg44vyf0005cr88k2b7b9pc',
      createdAt: 1550843428551,
    }

    const avroHighlight = JSONToAvro(
      require('../__mocks__/highlightschema'),
      hl,
    )

    expect(avroHighlight).toEqual({
      createdAt: 1550843428551,
      traceToken: 'cjsg44vyf0005cr88k2b7b9pc',
      eventId: 'cjsg44vyf0004cr88qro9k8mv',
      deleted: false,
      primaryAnnotationId: {
        string: 'cjsg44vxp0002cr88iuh3ymff',
      },
      video: {
        HighlightVideoRecord: {
          imageUrl: null,
          videoUrl: null,
          duration: 500,
          position: 10,
        },
      },
      annotations: [
        {
          createdAt: 1550843428526,
          actions: [
            {
              ScoreChangeAction: {
                team: 'home',
                type: 'increased',
              },
            },
            {
              UiScoreboardVisibilityAction: {
                visible: true,
              },
            },
          ],
          personId: null,
          team: { TeamEnum: 'home' },
          type: { FootballAnnotationTypeEnum: 'goal' },
          elapsedTime: 10,
          id: 'cjsg44vxp0002cr88iuh3ymff',
        },
        {
          createdAt: 1550843428526,
          actions: [
            {
              UiTimerVisibilityAction: {
                visible: true,
              },
            },
          ],
          personId: { string: 'personid1234' },
          team: { TeamEnum: 'home' },
          type: { FootballAnnotationTypeEnum: 'penalty' },
          elapsedTime: 10,
          id: 'cjsg44vxp0002cr88iuh3ymfh',
        },
      ],
      event: { id: 'cjsg44vst0000cr88768nlnfz' },
      _id: 'cjsg44vwp0001cr88mfe3kkep',
    })
  })
})
