export const addPlace = (place) => ({
	type: 'ADD_PLACE',
	place,
})

export const removePlace = (place, index) => ({
	type: 'REMOVE_PLACE',
	place,
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
