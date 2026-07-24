import { createContext, useState, useEffect } from "react";

export const CreatedPlansContext = createContext();

export function CreatedPlansProvider ({ children }) {
  const [createdPlans, setCreatedPlans] = useState(() => {
    const saved = localStorage.getItem('createdPlans');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect (() => {
    localStorage.setItem('createdPlans', JSON.stringify(createdPlans))
  }, [createdPlans])

  const addPlan = (plan) => {
    console.log(plan)
    setCreatedPlans((prev) => [...prev, plan]);
    console.log(createdPlans)
  }

  return (
    <CreatedPlansContext.Provider value={{createdPlans, setCreatedPlans, addPlan}}>
      {children}
    </CreatedPlansContext.Provider>
  )
};

