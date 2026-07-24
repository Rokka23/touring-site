import {  useContext } from "react";
import { SelectedSpotsContext } from "./SelectedSpotsContext";

export function useSelectedSpots() {
  const context = useContext(SelectedSpotsContext);
  if (!context) {
    throw new Error("useSelectedSpots must be used within SelectedSpotsProvider");
  }
  return context;
}