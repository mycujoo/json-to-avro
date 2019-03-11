'use strict'

const { avroToJSON, JSONToAvro } = require('../')

const SeasonSchema = require('../__mocks__/SeasonSchema.json')
const HighlightSchema = require('../__mocks__/HighlightSchema.json')

function avroToJSONToavro(nr) {
  return `It should convert an avro doc to JSON and back #${nr}`
}

function JSONToAvroToJSON(nr) {
  return `It should convert a JSON doc to avro and back #${nr}`
}

describe('Avro to JSON to avro conversion tests #2', () => {
  test('It should throw an error because of a nonnullable field', () => {
    const seasonJson = {
      id: 'cjsg44vwp0001cr88mfe3kkep',
      internationalName: 'Super season',
      competitionId: null,
      localName: 'Best season',
      logoUrl: 'http://logo.com',
      dateFrom: 12312,
      crazyfield: 'crazy',
      dateTo: 12313,
      numberOfParticipants: 12315,
      current: true,
      format: 'cup',
      teams: ['cjsg44vyf0004cr88qro9k8mv', 'cjsg44vyf0005cr88k2b7b9pc'],
      eventId: 'cjsg44vyf0004cr88qro9k8mv',
      traceToken: 'cjsg44vyf0005cr88k2b7b9pc',
      createdAt: 1550843428551,
    }
    expect(() => {
      JSONToAvro(SeasonSchema, seasonJson)
    }).toThrow()
  })

  test('It should throw an error because of a nonnullable array field', () => {
    const seasonJson = {
      id: 'cjsg44vwp0001cr88mfe3kkep',
      internationalName: 'Super season',
      competitionId: null,
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
    }
    expect(() => {
      JSONToAvro(SeasonSchema, seasonJson)
    }).toThrow()
  })
})

describe('Avro to JSON to avro conversion tests #1', () => {
  test(avroToJSONToavro(1), () => {
    const AvroSeason = {
      id: 'cjsg44vwp0001cr88mfe3kkep',
      internationalName: 'Super season',
      competitionId: 'cjsg44vyf0004cr88qro9k8mv',
      localName: {
        string: 'Best season',
      },
      logoUrl: {
        string: 'http://logo.com',
      },
      dateFrom: 12312,
      dateTo: 12313,
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
    const convertedSeason = avroToJSON(SeasonSchema, AvroSeason)
    expect(convertedSeason).toEqual({
      id: 'cjsg44vwp0001cr88mfe3kkep',
      internationalName: 'Super season',
      competitionId: 'cjsg44vyf0004cr88qro9k8mv',
      crazyfield: 'crazy',
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

    const avroSeason = JSONToAvro(SeasonSchema, convertedSeason)
    expect(avroSeason).toEqual(AvroSeason)
  })

  test(avroToJSONToavro(2), () => {
    const AvroSeason = {
      id: 'cjsg44vwp0001cr88mfe3kkep',
      internationalName: 'Super season',
      competitionId: 'cjsg44vyf0004cr88qro9k8mv',
      localName: {
        string: 'Best season',
      },
      logoUrl: {
        string: 'http://logo.com',
      },
      dateFrom: 12312,
      dateTo: 12313,
      numberOfParticipants: 12315,
      crazyfield: {
        int: 1337,
      },
      current: true,
      format: 'cup',
      teams: ['cjsg44vyf0004cr88qro9k8mv', 'cjsg44vyf0005cr88k2b7b9pc'],
      eventId: 'cjsg44vyf0004cr88qro9k8mv',
      traceToken: 'cjsg44vyf0005cr88k2b7b9pc',
      createdAt: 1550843428551,
    }
    const convertedSeason = avroToJSON(SeasonSchema, AvroSeason)
    expect(convertedSeason).toEqual({
      id: 'cjsg44vwp0001cr88mfe3kkep',
      internationalName: 'Super season',
      competitionId: 'cjsg44vyf0004cr88qro9k8mv',
      crazyfield: 1337,
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

    const avroSeason = JSONToAvro(SeasonSchema, convertedSeason)
    expect(avroSeason).toEqual(AvroSeason)
  })

  test(avroToJSONToavro(3), () => {
    const AvroHighlight = {
      _id: 'cjsg44vwp0001cr88mfe3kkep',
      event: {
        id: 'cjsg44vst0000cr88768nlnfz',
      },
      annotations: [
        {
          id: 'cjsg44vxp0002cr88iuh3ymff',
          elapsedTime: 10,
          type: {
            FootballAnnotationTypeEnum: 'goal',
          },
          team: {
            TeamEnum: 'home',
          },
          personId: null,
          actions: [
            {
              ScoreChangeAction: {
                type: 'increased',
                team: 'home',
              },
            },
          ],
          createdAt: 1550843428526,
        },
      ],
      video: {
        HighlightVideoRecord: {
          position: 10,
          duration: 500,
          videoUrl: null,
          imageUrl: null,
        },
      },
      primaryAnnotationId: {
        string: 'cjsg44vxp0002cr88iuh3ymff',
      },
      deleted: false,
      eventId: 'cjsg44vyf0004cr88qro9k8mv',
      traceToken: 'cjsg44vyf0005cr88k2b7b9pc',
      createdAt: 1550843428551,
    }
    const convertedHiglight = avroToJSON(HighlightSchema, AvroHighlight)
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

    const avroHighlight = JSONToAvro(HighlightSchema, convertedHiglight)
    expect(avroHighlight).toEqual(AvroHighlight)
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
    const convertedHiglight = avroToJSON(HighlightSchema, avroHighlight)
    expect(convertedHiglight).toEqual(hl)
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
    const convertedHiglight = avroToJSON(HighlightSchema, avroHighlight)
    expect(convertedHiglight).toEqual(hl)
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

    const jsonHighlight = avroToJSON(HighlightSchema, avroHighlight)

    expect(jsonHighlight).toEqual(hl)
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
    const convertedHiglight = avroToJSON(HighlightSchema, avroHighlight)
    expect(convertedHiglight).toEqual(hl)
  })
})
