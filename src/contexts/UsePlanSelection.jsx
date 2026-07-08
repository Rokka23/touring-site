import { useContext } from "react";
import { PlanSelectionContext } from "./PlanSelectionContext";


export function usePlanSelection() {
  return useContext(PlanSelectionContext)
}