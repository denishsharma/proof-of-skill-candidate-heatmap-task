import CandidateService from "@/services/candidate_service";
import { Layer, ManagedRuntime } from "effect";

export const ApplicationDependenciesLayer = Layer.mergeAll(
  CandidateService.Default,
)

export const ApplicationRuntime = ManagedRuntime.make(ApplicationDependenciesLayer)
