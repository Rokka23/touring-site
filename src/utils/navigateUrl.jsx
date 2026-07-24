export function navigateUrl (spots){
 
  // 目的地
  const destination = spots[spots.length -1]
  // 経由地
  const waypoints = spots.slice(0, -1)

  const params = new URLSearchParams ({
    api: 1,
    destination: `${destination[0]}, ${destination[1]}`,
    travelmode: 'driving'
  })

  if(waypoints.length > 0) {
    params.set (
      'waypoints',
      waypoints.map((w) =>`${w[0]},${w[1]}`).join("|")
    )
  }
  console.log(spots)

  return `https://www.google.com/maps/dir/?${params.toString()}`;
};