import { Spots } from '../data/spots.jsx'

export function filterSpots (area, types, seasons, levels){
  return Spots.filter(spot => {

    if(area && spot.area != area) return false;

    if(types.length > 0 &&
      !(Array.isArray(spot.type)
        ? spot.type.some(t => types.includes(t))
        : types.includes(spot.type))) return false;

    if(seasons.length > 0 &&
      !(Array.isArray(spot.season)
        ? spot.season.some(s => seasons.includes(s))
        : seasons.includes(spot.season))) return false;

    if(levels.length > 0 &&
      !(Array.isArray(spot.level)
        ? spot.level.some(l => levels.includes(l))
        : levels.includes(spot.level))) return false;

    return true;
  })
}