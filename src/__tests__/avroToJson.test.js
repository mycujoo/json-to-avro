'use strict'

const _ = require('lodash')
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

  test('checkRecord', () => {
    const record = {
      createdAt: 1556202751238,
      traceToken: 'cjuwqxrt2000azs883fm028a4',
      eventId: 'cjuwqxrt20009zs88gi752p44',
      deleted: false,
      primaryAnnotationId: 'cjuwqxrsq0007zs8879raf28j',
      annotations: [
        {
          createdAt: 1556202751226,
          actions: [
            { team: 'home', type: 'increased', __type: 'ScoreChangeAction' },
          ],
          team: 'home',
          type: 'goal',
          elapsedTime: 10,
          id: 'cjuwqxrsq0007zs8879raf28j',
        },
      ],
      event: { id: 'cjuwqxrj50000zs882tm3d3cr' },
      id: 'cjuwqxrsm0006zs88fda379eq',
    }

    const schema = {
      name: 'highlight_v1',
      type: 'record',
      fields: [
        { name: 'id', type: 'string', doc: 'ID of the highlight' },
        {
          name: 'event',
          type: {
            name: 'highlightEvent',
            type: 'record',
            fields: [
              {
                name: 'id',
                type: 'string',
                doc: 'ID of the event where the highlight belongs to',
              },
            ],
            doc: 'The match/event the highlight belongs to',
          },
          doc: 'The match/event the highlight belongs to',
        },
        {
          name: 'annotations',
          type: {
            type: 'array',
            items: {
              name: 'Annotation',
              type: 'record',
              fields: [
                { name: 'id', type: 'string', doc: 'ID of the annotation' },
                {
                  name: 'elapsedTime',
                  type: 'int',
                  doc:
                    'position in the video where the annotation is marked, seconds',
                },
                {
                  name: 'type',
                  type: [
                    'null',
                    {
                      name: 'FootballAnnotationTypeEnum',
                      type: 'enum',
                      symbols: [
                        'startPeriod',
                        'endPeriod',
                        'foul',
                        'freeKick',
                        'cornerKick',
                        'goal',
                        'ownGoal',
                        'miss',
                        'chance',
                        'penalty',
                        'redCard',
                        'yellowCard',
                        'substitution',
                        'skill',
                      ],
                    },
                  ],
                  doc: 'Annotation Type',
                },
                {
                  name: 'team',
                  type: [
                    'null',
                    {
                      name: 'TeamEnum',
                      type: 'enum',
                      symbols: ['home', 'away'],
                    },
                  ],
                  doc: 'The team which the annotation belongs to',
                },
                {
                  name: 'personId',
                  type: ['null', 'string'],
                  doc: 'The person which the annotation belongs to',
                },
                {
                  name: 'actions',
                  type: {
                    type: 'array',
                    items: [
                      {
                        name: 'PlayerChangeAction',
                        type: 'record',
                        fields: [
                          {
                            name: 'type',
                            type: {
                              name: 'PlayerChangeTypeEnum',
                              type: 'enum',
                              symbols: ['removed', 'added'],
                            },
                            doc: 'The type of the player change',
                          },
                          {
                            name: 'personId',
                            type: 'string',
                            doc: 'ID of the person related to the action',
                          },
                        ],
                        doc: 'action for changing player',
                      },
                      {
                        name: 'ScoreChangeAction',
                        type: 'record',
                        fields: [
                          {
                            name: 'type',
                            type: {
                              name: 'ScoreChangeTypeEnum',
                              type: 'enum',
                              symbols: ['increased', 'decreased'],
                            },
                            doc: 'The type of the score change',
                          },
                          { name: 'team', type: 'TeamEnum' },
                        ],
                        doc: 'action for changing score',
                      },
                      {
                        name: 'TimerChangeAction',
                        type: 'record',
                        fields: [
                          {
                            name: 'type',
                            type: {
                              name: 'TimerChangeTypeEnum',
                              type: 'enum',
                              symbols: ['start', 'stop', 'update'],
                            },
                            doc: 'The type of the change',
                          },
                          {
                            name: 'timer',
                            type: 'int',
                            doc:
                              'The clock/timer position of the match in seconds',
                          },
                        ],
                        doc: 'action for changing timer status and value',
                      },
                      {
                        name: 'UiScoreboardVisibilityAction',
                        type: 'record',
                        fields: [
                          {
                            name: 'visible',
                            type: 'boolean',
                            doc: 'Defines the visibility status for scoreboard',
                          },
                        ],
                        doc: 'action for changing Scoreboard visibility',
                      },
                      {
                        name: 'UiTimerVisibilityAction',
                        type: 'record',
                        fields: [
                          {
                            name: 'visible',
                            type: 'boolean',
                            doc: 'Defines the visibility status for timer',
                          },
                        ],
                        doc: 'action for changing Timer visibility',
                      },
                    ],
                  },
                  doc: 'List of actions to be executed for this annotation',
                },
                {
                  name: 'createdAt',
                  type: 'long',
                  doc:
                    'The moment this annotation was included in the highlight',
                },
              ],
              doc: 'Annotation information',
            },
          },
          doc: 'List of annotations of the highlight',
        },
        {
          name: 'video',
          type: [
            'null',
            {
              name: 'HighlightVideoRecord',
              type: 'record',
              fields: [
                {
                  name: 'position',
                  type: 'int',
                  doc:
                    'Position of the start of the video highlight in the main event video',
                },
                {
                  name: 'duration',
                  type: 'int',
                  doc: 'Duration of the video highlight',
                },
                {
                  name: 'videoUrl',
                  type: ['null', 'string'],
                  doc: 'url of the m3u8 of the highlight',
                },
                {
                  name: 'imageUrl',
                  type: ['null', 'string'],
                  doc: 'absolute url from the thumbnail of the highlight',
                },
              ],
              doc: 'record of the video related to the highlight',
            },
          ],
          doc: 'Video information of the highlight',
        },
        {
          name: 'primaryAnnotationId',
          type: ['null', 'string'],
          doc: 'Id of the main annotation',
        },
        {
          name: 'deleted',
          type: 'boolean',
          doc: 'Highlight is deleted or still active',
        },
        {
          name: 'eventId',
          type: 'string',
          doc: 'Unique ID for the Kafka event',
        },
        {
          name: 'traceToken',
          type: 'string',
          doc: 'Trace token for this request, coming from upstream service',
        },
        {
          name: 'createdAt',
          type: 'long',
          doc: 'Time when request was processed by the service',
        },
      ],
      doc: 'Highlighted moment for live events',
    }
    const options = { wrapUnions: false }
    checkRecord(schema, record, options)
  })
  test(avroToJsonToavro(6), () => {
    const profile = require('../__mocks__/Profile.json')
    const profileSchema = require('../__mocks__/ProfileSchema.json')
    const jsonP = avroToJson(profileSchema, {
      createdAt: 1550160811002,
      traceToken: '925f6000-0570-43fb-b99a-05cc3e9960ba',
      eventId: '3a6d7ac3-b3cb-417d-be2b-6b5c8d6825b3',
      lastName: { string: 'Carvalho' },
      firstName: { string: 'Fábio' },
      personId: { string: 'cjs4nopz8000e0jbp7frkjuz7' },
      userId: { string: '110186' },
      id: '7ba19a4f-c44d-4363-844f-20c8ab7d0311',
    })
    expect(jsonP).toEqual(_.omitBy(profile, _.isNil))
  })
})
