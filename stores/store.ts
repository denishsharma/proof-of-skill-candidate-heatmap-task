import { CandidateList, CandidateSkills } from "@/services/candidate_service";
import { atom, createStore } from "jotai";

export const store = createStore()

export const candidateListAtom = atom<CandidateList>([]);
export const selectedCandidatesAtom = atom<string[]>([]);

export const candidateSkillsAtom = atom<CandidateSkills[]>([]);

function transformToHeatmapData(candidates: CandidateList, candidateSkills: CandidateSkills[]) {
  const candidateMap = Object.fromEntries(candidates.map(c => [c.id, c.name]));

  const skillMap = new Map();

  for (const entry of candidateSkills) {
    const candidateName = candidateMap[entry.candidate_id];
    if (!candidateName) continue;

    for (const skill of entry.skills) {
      if (!skillMap.has(skill.name)) {
        skillMap.set(skill.name, []);
      }
      skillMap.get(skill.name).push({ x: candidateName, y: skill.score });
    }
  }

  return Array.from(skillMap.entries()).map(([skillName, data]) => ({
    name: skillName,
    data,
  }));
}

export const heatmapDataAtom = atom((get) => {
  const candidates = get(candidateListAtom);
  const candidateSkills = get(candidateSkillsAtom);
  return transformToHeatmapData(candidates, candidateSkills);
})
