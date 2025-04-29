import { Effect, Schema } from "effect";

export const CandidateListSchema = Schema.ArrayEnsure(
  Schema.Struct({
    id: Schema.String,
    name: Schema.String,
  })
)
export type CandidateList = typeof CandidateListSchema.Type

export const CandidateSkillsSchema = Schema.Struct({
  candidate_id: Schema.String,
  skills: Schema.ArrayEnsure(
    Schema.Struct({
      id: Schema.String,
      name: Schema.String,
      score: Schema.Number,
    })
  )
})
export type CandidateSkills = typeof CandidateSkillsSchema.Type

export default class CandidateService extends Effect.Service<CandidateService>()('@service/candidate', {
  effect: Effect.gen(function* () {
    function list() {
      return Effect.gen(function* () {
        const response = yield* Effect.tryPromise(async () => {
          const res = await fetch('https://forinterview.onrender.com/people/')
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
          }
          return res.json()
        })
        return yield* Schema.decodeUnknown(CandidateListSchema, { errors: 'all' })(response)
      })
    }

    function skills(id: string) {
      return Effect.gen(function* () {
        const response = yield* Effect.tryPromise(async () => {
          const res = await fetch(`https://forinterview.onrender.com/people/${id}/`)
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
          }
          return res.json()
        })
        const data = yield* Schema.decodeUnknown(
          Schema.Struct({
            data: Schema.Struct({
              data: Schema.Struct({
                skillset: Schema.ArrayEnsure(
                  Schema.Struct({
                    skills: Schema.ArrayEnsure(
                      Schema.Struct({
                        id: Schema.String,
                        name: Schema.String,
                        pos: Schema.ArrayEnsure(
                          Schema.Struct({
                            consensus_score: Schema.Number,
                          })
                        )
                      })
                    )
                  })
                )
              })
            })
          }),
          { errors: 'all' }
        )(response)

        return yield* Schema.decode(CandidateSkillsSchema, { errors: 'all' })({
          candidate_id: id,
          skills: data.data.data.skillset.map(skillset => {
            return skillset.skills.map(skill => {
              return {
                id: skill.id,
                name: skill.name,
                score: skill.pos[0].consensus_score
              }
            })
          }).flat()
        });
      })
    }

    return {
      list,
      skills
    }
  }),
}) { }
