import { createContext, useState } from "react";

export const SelectedSpotsContext = createContext();

export function SelectedSpotsProvider({ children }) {
  // 選択中のスポット状態を保持
  const [selectedSpots, setSelectedSpots] = useState([]);

  // スポット選択
  const addSpot = (spot) => {
    setSelectedSpots((prev) => {
      // 重複チェック
      if(prev.some((item) => item.name === spot.name)) {
        return prev;
      }

      return [...prev,spot];
    });
  };

  const removeSpot = (name) => {
    setSelectedSpots((prev) => 
      prev.filter((spot) => spot.name !== name)
    );
  };

  const clearSpot = () => {
    setSelectedSpots([]);
  };

return (
  <SelectedSpotsContext.Provider
    value={{
      selectedSpots,
      setSelectedSpots,
      addSpot,
      removeSpot,
      clearSpot,
    }}
  >
    {children}
  </SelectedSpotsContext.Provider>
)
};

