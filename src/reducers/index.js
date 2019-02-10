import {combineReducers} from 'redux';
//when we use Geocode the place locotion is not a function
const wrapLocation = (location) => {
	let lat = '';
	let lng = '';
	if ((typeof location.lat === "function") && (typeof location.lat === "function")) {
		lat = location.lat()
		lng = location.lng()
	} else {
		lat = location.lat
		lng = location.lng
	}
	return {lat, lng}
}

const getPlaces = (state = [], action) => {
	switch (action.type) {
		case 'ADD_PLACE':
			const {location} = action.place.geometry
			return [
				...state, {
					place: action.place,
					id: action.place.id,
					location: wrapLocation(location)
				}
			]
			break;
		case 'REMOVE_PLACE':
			return [
				...state.slice(0, action.index),
				...state.slice(action.index + 1)
			]

			break;
			//is used for showing onfoWindow and dragging the marker
		case 'UPDATE_PLACE':
			return state.map(elem => {
				if (elem == action.place) {
					const newObj = Object.assign({}, elem, action.newPlace, {
						id: action.newPlace.place.place_id,
						location: action.newPlace.place.geometry.location
					})
					return newObj
				}
				return elem
			})
			break;
			//this is used after reordering
		case 'UPDATE_PLACES_ARRAY':
			return action.placesArray
		default:
			return state
	}
}

const getCenter = (state = {
	lat: 55.755826,
	lng: 37.61
}, action) => {
	switch (action.type) {
		case 'SET_CENTER':
			return wrapLocation(action.location)
			break;
		default:
			return state
	}
}

const reducers = combineReducers({getPlaces, getCenter});

export default reducers
