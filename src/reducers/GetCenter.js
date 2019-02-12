
export const getCenter = (state = {
  lat: 55.755826,
  lng: 37.61
}, action) => {
  switch (action.type) {
    case 'SET_CENTER':
      return action.location
      break;
    default:
      return state
  }
}
