'use strict'

const { avroToJson } = require('../../')
const { checkRecord } = require('../avroToJson')
const SeasonSchema = require('../__mocks__/SeasonSchema.json')
const HighlightSchema = require('../__mocks__/HighlightSchema.json')
const IssueSchema = require('../__mocks__/IssueSchema.json')

function avroToJsonToavro(nr) {
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
      maybe: { boolean: true },
      dateTo: 12313,
      numberOfParticipants: 12315,
      couldBeANumber: null,
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

  test(avroToJsonToavro(1), () => {
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
      maybe: null,
      dateTo: 12313,
      couldBeANumber: { int: 1 },
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
    const convertedSeason = avroToJson(SeasonSchema, AvroSeason)
    expect(convertedSeason).toEqual({
      id: 'cjsg44vwp0001cr88mfe3kkep',
      internationalName: 'Super season',
      competitionId: 'cjsg44vyf0004cr88qro9k8mv',
      crazyfield: 'crazy',
      localName: 'Best season',
      logoUrl: 'http://logo.com',
      dateFrom: 12312,
      couldBeANumber: 1,
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

  test(avroToJsonToavro(2), () => {
    const AvroSeason = {
      id: 'cjsg44vwp0001cr88mfe3kkep',
      internationalName: 'Super season',
      couldBeANumber: null,
      competitionId: 'cjsg44vyf0004cr88qro9k8mv',
      localName: {
        string: 'Best season',
      },
      logoUrl: {
        string: 'http://logo.com',
      },
      dateFrom: 12312,
      maybe: { boolean: true },
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
    const convertedSeason = avroToJson(SeasonSchema, AvroSeason)
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
      maybe: true,
      format: 'cup',
      teams: ['cjsg44vyf0004cr88qro9k8mv', 'cjsg44vyf0005cr88k2b7b9pc'],
      eventId: 'cjsg44vyf0004cr88qro9k8mv',
      traceToken: 'cjsg44vyf0005cr88k2b7b9pc',
      createdAt: 1550843428551,
    })
  })

  test(avroToJsonToavro(3), () => {
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
    const convertedHiglight = avroToJson(HighlightSchema, AvroHighlight)
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
  test(avroToJsonToavro(4), () => {
    const AvroIssue = {
      id: '5c9a4245f91d660a072e2aa8',
      deleted: false,
      title: 'Klaagzang',
      slackName: 'joeri',
      description: 'Alles gaat naar de klere in de land!',
      creatorUserId: 'joeri',
      updaterUserId: null,
      browser: 'chrome',
      severity: 'severity1',
      status: 'open',
      itemId: '5c9a4218f91d660a072e2aa7',
      updatedAt: 1553613381456,
      createdAt: 1235123140,
      eventId: 'cjtpxalao0003zb88c2yu8ul6',
      traceToken: '',
    }
    const convertedIssue = avroToJson(IssueSchema, AvroIssue)
    expect(convertedIssue).toEqual({
      traceToken: '',
      eventId: 'cjtpxalao0003zb88c2yu8ul6',
      createdAt: 1235123140,
      updatedAt: 1553613381456,
      itemId: '5c9a4218f91d660a072e2aa7',
      status: 'open',
      severity: 'severity1',
      browser: 'chrome',
      creatorUserId: 'joeri',
      description: 'Alles gaat naar de klere in de land!',
      slackName: 'joeri',
      title: 'Klaagzang',
      deleted: false,
      id: '5c9a4245f91d660a072e2aa8',
    })
  })

  test(avroToJsonToavro(5), () => {
    const AvroHighlight = {
      _id: 'cjsg4927s00001beega95jysq',
      event: { id: 'cjsg490pr002t0k27kzqxi2px' },
      annotations: [
        {
          id: 'cjsg492cx00011beeajz5er4g',
          elapsedTime: 30,
          type: { FootballAnnotationTypeEnum: 'startPeriod' },
          team: null,
          personId: null,
          actions: [
            { TimerChangeAction: { type: 'start', timer: 0 } },
            { UiScoreboardVisibilityAction: { visible: true } },
            { UiTimerVisibilityAction: { visible: true } },
          ],
          createdAt: 1550843623474,
        },
      ],
      video: null,
      primaryAnnotationId: { string: 'cjsg492cx00011beeajz5er4g' },
      deleted: false,
      eventId: 'cjsg492f400051bee5x2m6fbz',
      traceToken: 'cjsg492f500061beez0bqxl41',
      createdAt: 1550843623553,
    }
    const convertedIssue = avroToJson(HighlightSchema, AvroHighlight, {
      wrapUnions: false,
    })
    expect(convertedIssue).toEqual({
      _id: 'cjsg4927s00001beega95jysq',
      event: { id: 'cjsg490pr002t0k27kzqxi2px' },
      annotations: [
        {
          id: 'cjsg492cx00011beeajz5er4g',
          elapsedTime: 30,
          type: 'startPeriod',
          actions: [
            {
              __type: 'TimerChangeAction',
              type: 'start',
              timer: 0,
            },
            { __type: 'UiScoreboardVisibilityAction', visible: true },
            { __type: 'UiTimerVisibilityAction', visible: true },
          ],
          createdAt: 1550843623474,
        },
      ],
      primaryAnnotationId: 'cjsg492cx00011beeajz5er4g',
      deleted: false,
      eventId: 'cjsg492f400051bee5x2m6fbz',
      traceToken: 'cjsg492f500061beez0bqxl41',
      createdAt: 1550843623553,
    })
  })

  test(avroToJsonToavro(6), () => {
    const AvroHighlight = {
      _id: 'cjsg4927s00001beega95jysq',
      event: { id: 'cjsg490pr002t0k27kzqxi2px' },
      annotations: [
        {
          id: 'cjsg492cx00011beeajz5er4g',
          elapsedTime: 30,
          type: { FootballAnnotationTypeEnum: 'startPeriod' },
          team: null,
          personId: null,
          actions: [
            { TimerChangeAction: { type: 'start', timer: 0 } },
            { UiScoreboardVisibilityAction: { visible: true } },
            { UiTimerVisibilityAction: { visible: true } },
          ],
          createdAt: 1550843623474,
        },
      ],
      video: null,
      primaryAnnotationId: { string: 123 },
      deleted: false,
      eventId: 'cjsg492f400051bee5x2m6fbz',
      traceToken: 'cjsg492f500061beez0bqxl41',
      createdAt: 1550843623553,
    }
    expect(() => {
      avroToJson(HighlightSchema, AvroHighlight)
    }).toThrow()
  })
})
