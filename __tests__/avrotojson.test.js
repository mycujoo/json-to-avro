'use strict'

const { avroToJSON } = require('../')
const { checkRecord } = require('../src/avroToJSON')
const SeasonSchema = require('../__mocks__/SeasonSchema.json')
const HighlightSchema = require('../__mocks__/HighlightSchema.json')

function avroToJSONToavro(nr) {
  return `It should convert an avro doc to JSON #${nr}`
}

describe('Avro to JSON conversion tests', () => {
  test('It should throw an error because of a nonnullable field', () => {
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
  })
})
