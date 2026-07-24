import { useContext } from "react";
import { CreatedPlansContext } from "./CreatedPlansContext";

export function useCreatedPlans() {
  const context = useContext(CreatedPlansContext);
  if (!context) throw new Error('usePlans must be used within PlanProvider');
  return context;
}