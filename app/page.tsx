'use client'

import CandidateList from "@/components/candidate-list";
import Heatmap from "@/components/heatmap";
import { ApplicationRuntime } from "@/runtime/runtime";
import CandidateService from "@/services/candidate_service";
import { candidateListAtom, candidateSkillsAtom, selectedCandidatesAtom, store } from "@/stores/store";
import { Array, Effect } from "effect";
import { Provider } from "jotai";
import { useCallback, useEffect } from "react";

export default function Home() {
  const fetchSkills = useCallback(
    (id: string) => {
      return CandidateService.use(_ => _.skills(id)).pipe(
        Effect.tap(skills => {
          store.set(selectedCandidatesAtom, _ => {
            return [..._, id]
          })

          store.set(candidateSkillsAtom, _ => {
            return Array.dedupeWith([..._, skills], (a, b) => a.candidate_id === b.candidate_id)
          })
        }),
        ApplicationRuntime.runPromise
      )
    },
    []
  )

  useEffect(() => {
    CandidateService.use(_ => _.list()).pipe(
      Effect.tap(list => {
        store.set(candidateListAtom, list)
      }),
      ApplicationRuntime.runPromise
    )
  }, [])

  return (
    <Provider store={store}>
      <div className={'h-full flex flex-col overflow-hidden'}>
        <div className={'mx-auto max-w-5xl w-full px-8 py-4 flex flex-col'}>
          <div className={'mt-4 font-bold text-3xl'}>
            Posk_UXdesigner_sr001
          </div>
        </div>

        <div className={'mx-auto max-w-5xl relative w-full px-8 py-4 flex gap-x-4'}>
          <div className={'w-60 shrink-0 h-fit rounded-lg ring ring-inset ring-neutral-200 flex flex-col gap-1.5 p-2'}>
            <CandidateList onFetchSkills={fetchSkills} />
          </div>

          <div className={'grow relative overflow-hidden p-4 rounded-lg min-h-120 h-fit ring ring-inset ring-neutral-200 flex flex-col'}>
            <Heatmap />
          </div>
        </div>
      </div>
    </Provider>
  );
}
