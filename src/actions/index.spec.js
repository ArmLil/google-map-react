import * as actions from './index'

describe('place actions', () => {
  it('addPlace should create ADD_PLACE action', () => {
    expect(actions.addPlace('My Place','location', 'anyId')).toEqual({
      type: 'ADD_PLACE',
      place: 'My Place',
      location: 'location',
      id: 'anyId',
    })
  })

  it('removePlace should create REMOVE_PLACE action', () => {
    expect(actions.removePlace('My Place', 1)).toEqual({
      type: 'REMOVE_PLACE',
      place: 'My Place',
      index: 1
    })
  })

  it('updatePlace should create UPDATE_PLACE action', () => {
    expect(actions.updatePlace('My Place', 'New Place')).toEqual({
      type: 'UPDATE_PLACE',
      place: 'My Place',
      newPlace: 'New Place',
    })
  })

  it('setCenter should create SET_CENTER action', () => {
    expect(actions.setCenter('location')).toEqual({
      type: 'SET_CENTER',
      location: 'location'
    })
  })

  it('updatePlacesArray should create UPDATE_PLACES_ARRAY action', () => {
    expect(actions.updatePlacesArray('placesArray')).toEqual({
      type: 'UPDATE_PLACES_ARRAY',
      placesArray: 'placesArray'
    })
  })

})
