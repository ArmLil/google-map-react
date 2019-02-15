export const addPlace = (name, location, id) => ({
  type: 'ADD_PLACE',
  name,
  location,
  id,
})

export const removePlace = (index) => ({
  type: 'REMOVE_PLACE',
  index,
})

export const updatePlace = (place, newPlace) => ({
  type: 'UPDATE_PLACE',
  place,
  newPlace,
})

export const setCenter = (location) => ({
  type: 'SET_CENTER',
  location,
})

export const updatePlacesArray = (placesArray) => ({
  type: 'UPDATE_PLACES_ARRAY',
  placesArray,
})
