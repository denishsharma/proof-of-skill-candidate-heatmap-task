'use client'

import CandidateListItem from "@/components/candidate-list-item";
import { candidateListAtom, store } from "@/stores/store";
import { useAtomValue } from "jotai";

type CandidateListItemProps = Readonly<{
  onFetchSkills: (id: string) => void
}>

export default function CandidateList(props: CandidateListItemProps) {
  const candidateList = useAtomValue(candidateListAtom, { store })

  return (
    <>
      {candidateList.map((item) => (
        <CandidateListItem
          key={item.id}
          name={item.name}
          id={item.id}
          onClick={id => {
            props.onFetchSkills(id)
          }}
        />
      ))}

      {candidateList.length === 0 && (
        <div className={'grow min-h-10 flex items-center justify-center'}>
          <span className={'icon-[svg-spinners--3-dots-fade] size-4.5'} />
        </div>
      )}
    </>
  )
}
