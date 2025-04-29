'use client'

import { selectedCandidatesAtom, store } from "@/stores/store";
import { useAtomValue } from "jotai";
import { useMemo } from "react";

type CandidateListItemProps = Readonly<{
  id: string;
  name: string;
  onClick?: (id: string) => void;
}>

export default function CandidateListItem(props: CandidateListItemProps) {
  const selectedCandidates = useAtomValue(selectedCandidatesAtom, { store });
  const isSelected = useMemo(() => selectedCandidates.includes(props.id), [props.id, selectedCandidates]);

  return (
    <div
      data-is-selected={isSelected}
      className={'px-2 select-none bg-neutral-50 h-8 leading-8 flex items-center justify-between gap-x-2 rounded-lg ring ring-inset ring-neutral-200 not-data-[is-selected=true]:hover:bg-neutral-100 transition data-[is-selected=true]:opacity-40'}

    >
      <div className={'text-sm font-medium'}>
        {props.name}
      </div>

      <button
        type={'button'}
        className={'ml-2 size-6 bg-white flex items-center justify-center rounded-lg ring ring-inset ring-neutral-200 not-disabled:hover:bg-blue-500 not-disabled:hover:text-white transition'}
        onClick={() => props.onClick?.(props.id)}
        disabled={selectedCandidates.includes(props.id)}
      >
        <span className={'icon-[lucide--plus] size-4.5'} />
      </button>
    </div>
  );
}
