import {  useContext } from "react";
import { PlanSelectionContext } from "./PlanSelectionContext";

export function usePlanSelection() {
  const context = useContext(PlanSelectionContext);
  if (!context) {
    throw new Error("usePlanSelection must be used within PlanSelectionProvider");
  }
  return context;
}