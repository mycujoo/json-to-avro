'use strict'

const { JSONToAvro } = require('../../')
const { checkRecord } = require('../JSONToAvro')

const SeasonSchema = require('../__mocks__/SeasonSchema.json')
const HighlightSchema = require('../__mocks__/HighlightSchema.json')

function JSONToAvroToJSON(nr) {
  return `It should convert a JSON doc to avro #${nr}`
}

describe('JSON to avro conversion tests', () => {
  test('It should throw an error because of a nonnullable field', () => {
    const seasonJson = {
      competitionId: null,
      crazyfield: 'crazy',
      createdAt: 1550843428551,
      current: true,
      dateFrom: 12312,
      dateTo: 12313,
      eventId: 'cjsg44vyf0004cr88qro9k8mv',
      format: 'cup',
      id: 'cjsg44vwp0001cr88mfe3kkep',
      internationalName: 'Super season',
      localName: 'Best season',
      logoUrl: 'http://logo.com',
      numberOfParticipants: 12315,
      teams: ['cjsg44vyf0004cr88qro9k8mv', 'cjsg44vyf0005cr88k2b7b9pc'],
      traceToken: 'cjsg44vyf0005cr88k2b7b9pc',
    }
    expect(() => {
      JSONToAvro(SeasonSchema, seasonJson)
    }).toThrow()
  })

  test('It should not throw an error ', () => {
    const seasonJson = {
      competitionId: '123',
      crazyfield: 'crazy',
      createdAt: 1550843428551,
      current: true,
      dateFrom: 12312,
      dateTo: 12313,
      eventId: 'cjsg44vyf0004cr88qro9k8mv',
      format: 'cup',
      id: 'cjsg44vwp0001cr88mfe3kkep',
      internationalName: 'Super season',
      localName: 'Best season',
      logoUrl: 'http://logo.com',
      numberOfParticipants: 12315,
      teams: ['cjsg44vyf0004cr88qro9k8mv', 'cjsg44vyf0005cr88k2b7b9pc'],
      traceToken: 'cjsg44vyf0005cr88k2b7b9pc',
    }
    expect(() => {
      JSONToAvro(SeasonSchema, seasonJson)
    }).not.toThrow()
  })

  test('It should throw an error because of a nonnullable array field', () => {
    const seasonJson = {
      competitionId: null,
      createdAt: 1550843428551,
      current: true,
      dateFrom: 12312,
      dateTo: 12313,
      maybe: true,
      eventId: 'cjsg44vyf0004cr88qro9k8mv',
      format: 'cup',
      id: 'cjsg44vwp0001cr88mfe3kkep',
      internationalName: 'Super season',
      localName: 'Best season',
      logoUrl: 'http://logo.com',
      numberOfParticipants: 12315,
      teams: ['cjsg44vyf0004cr88qro9k8mv', 'cjsg44vyf0005cr88k2b7b9pc'],
      traceToken: 'cjsg44vyf0005cr88k2b7b9pc',
    }
    expect(() => {
      JSONToAvro(SeasonSchema, seasonJson)
    }).toThrow()
  })

  test('It should throw an error because of a nonnullable array field', () => {
    const AvroSeason = {
      id: 'cjsg44vwp0001cr88mfe3kkep',
      internationalName: 'Super season',
      competitionId: null,
      localName: {
        string: 'Best season',
      },
      logoUrl: {
        string: 'http://logo.com',
      },
      dateFrom: 12312,
      dateTo: 12313,
      couldBeANumber: null,
      numberOfParticipants: 12315,
      crazyfield: {
        string: 'crazy',
      },
      current: true,
      format: 'cup',
      teams: ['cjsg44vyf0004cr88qro9k8mv', 'cjsg44vyf0005cr88k2b7b9pc'],
      eventId: 'cjsg44vyf0004cr88qro9k8mv',
      traceToken: 'cjsg44vyf0005cr88k2b7b9pc',
      createdAt: 1550843428551,
    }
    expect(() => {
      checkRecord(SeasonSchema, AvroSeason)
    }).toThrow()
  })

  test('It should not throw an error', () => {
    const AvroSeason = {
      competitionId: '123',
      couldBeANumber: {
        int: 1234,
      },
      crazyfield: {
        string: 'crazy',
      },
      createdAt: 1550843428551,
      current: true,
      dateFrom: 12312,
      dateTo: 12313,
      eventId: 'cjsg44vyf0004cr88qro9k8mv',
      format: 'cup',
      id: 'cjsg44vwp0001cr88mfe3kkep',
      internationalName: 'Super season',
      localName: {
        string: 'Best season',
      },
      logoUrl: {
        string: 'http://logo.com',
      },
      maybe: null,
      numberOfParticipants: 12315,
      teams: ['team1'],
      traceToken: 'cjsg44vyf0005cr88k2b7b9pc',
    }
    expect(() => {
      checkRecord(SeasonSchema, AvroSeason)
    }).not.toThrow()
  })

  test(JSONToAvroToJSON(1), () => {
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
    const avroHighlight = JSONToAvro(HighlightSchema, hl)
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

  test(JSONToAvroToJSON(2), () => {
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
          actions: [],
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
    const avroHighlight = JSONToAvro(HighlightSchema, hl)
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

  test(JSONToAvroToJSON(3), () => {
    const hl = {
      _id: 'cjsg44vwp0001cr88mfe3kkep',
      event: {
        id: 'cjsg44vst0000cr88768nlnfz',
      },
      annotations: [],
      video: { position: 10, duration: 500 },
      primaryAnnotationId: 'cjsg44vxp0002cr88iuh3ymff',
      deleted: false,
      eventId: 'cjsg44vyf0004cr88qro9k8mv',
      traceToken: 'cjsg44vyf0005cr88k2b7b9pc',
      createdAt: 1550843428551,
    }
    const avroHighlight = JSONToAvro(HighlightSchema, hl)
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

  test(JSONToAvroToJSON(4), () => {
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

    const avroHighlight = JSONToAvro(HighlightSchema, hl)

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
  })

  test(JSONToAvroToJSON(5), () => {
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
      video: { position: 10, duration: 500 },
      primaryAnnotationId: 'cjsg44vxp0002cr88iuh3ymff',
      deleted: false,
      eventId: 'cjsg44vyf0004cr88qro9k8mv',
      traceToken: 'cjsg44vyf0005cr88k2b7b9pc',
      createdAt: 1550843428551,
    }

    const avroHighlight = JSONToAvro(HighlightSchema, hl)

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

  test(JSONToAvroToJSON(6), () => {
    const seasonJson = {
      competitionId: '123',
      crazyfield: 'crazy',
      createdAt: 1550843428551,
      current: true,
      dateFrom: 12312,
      dateTo: 12313,
      eventId: 'cjsg44vyf0004cr88qro9k8mv',
      format: 'cup',
      id: 'cjsg44vwp0001cr88mfe3kkep',
      internationalName: 'Super season',
      localName: 'Best season',
      logoUrl: 'http://logo.com',
      numberOfParticipants: 12315,
      teams: ['cjsg44vyf0004cr88qro9k8mv', 'cjsg44vyf0005cr88k2b7b9pc'],
      traceToken: 'cjsg44vyf0005cr88k2b7b9pc',
    }
    const avroSeason = JSONToAvro(SeasonSchema, seasonJson)
    expect(avroSeason).toEqual({
      competitionId: '123',
      couldBeANumber: null,
      crazyfield: {
        string: 'crazy',
      },
      createdAt: 1550843428551,
      current: true,
      dateFrom: 12312,
      dateTo: 12313,
      eventId: 'cjsg44vyf0004cr88qro9k8mv',
      format: 'cup',
      id: 'cjsg44vwp0001cr88mfe3kkep',
      internationalName: 'Super season',
      localName: {
        string: 'Best season',
      },
      logoUrl: {
        string: 'http://logo.com',
      },
      maybe: null,
      numberOfParticipants: 12315,
      teams: ['cjsg44vyf0004cr88qro9k8mv', 'cjsg44vyf0005cr88k2b7b9pc'],
      traceToken: 'cjsg44vyf0005cr88k2b7b9pc',
    })
  })
  test(JSONToAvroToJSON(7), () => {
    const seasonJson = {
      competitionId: '123',
      crazyfield: 'crazy',
      couldBeANumber: 1234,
      createdAt: 1550843428551,
      current: true,
      dateFrom: 12312,
      dateTo: 12313,
      eventId: 'cjsg44vyf0004cr88qro9k8mv',
      format: 'cup',
      id: 'cjsg44vwp0001cr88mfe3kkep',
      internationalName: 'Super season',
      localName: 'Best season',
      logoUrl: 'http://logo.com',
      numberOfParticipants: 12315,
      teams: ['cjsg44vyf0004cr88qro9k8mv', 'cjsg44vyf0005cr88k2b7b9pc'],
      traceToken: 'cjsg44vyf0005cr88k2b7b9pc',
    }
    const avroSeason = JSONToAvro(SeasonSchema, seasonJson)
    expect(avroSeason).toEqual({
      competitionId: '123',
      couldBeANumber: {
        int: 1234,
      },
      crazyfield: {
        string: 'crazy',
      },
      createdAt: 1550843428551,
      current: true,
      dateFrom: 12312,
      dateTo: 12313,
      eventId: 'cjsg44vyf0004cr88qro9k8mv',
      format: 'cup',
      id: 'cjsg44vwp0001cr88mfe3kkep',
      internationalName: 'Super season',
      localName: {
        string: 'Best season',
      },
      logoUrl: {
        string: 'http://logo.com',
      },
      maybe: null,
      numberOfParticipants: 12315,
      teams: ['cjsg44vyf0004cr88qro9k8mv', 'cjsg44vyf0005cr88k2b7b9pc'],
      traceToken: 'cjsg44vyf0005cr88k2b7b9pc',
    })
  })
})
