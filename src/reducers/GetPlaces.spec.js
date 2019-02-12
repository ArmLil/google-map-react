import {getPlaces} from './GetPlaces.js';

describe( 'getPlaces reducer', () => {
  it( 'should handle initial state', () => {
    expect(
      getPlaces(undefined, {})
    ).toEqual([])
  })

  it('should handle ADD_PLACE', () => {
    expect(
      getPlaces([], {
        type: 'ADD_PLACE',
        place: 'My Place',
        location: {lat: 'lat', lng: 'lng'},
        id: 'anyId',
      })
    ).toEqual([
      {
        place: 'My Place',
        location: {lat: 'lat',lng: 'lng'},
        id: 'anyId',
        infoWindow: false,
      }
    ])
  })

  it('should handle REMOVE_PLACE', () => {
    expect(
      getPlaces([{
        type: 'REMOVE_PLACE',
        place: 'My Place',
        index: 0,
      }, {
        type: 'REMOVE_PLACE',
        place: 'Removable Place',
        index: 1,
      }], {
        type: 'REMOVE_PLACE',
        place: 'Removable Place',
        index: 1,
      })
    ).toEqual([{
      type: 'REMOVE_PLACE',
      place: 'My Place',
      index: 0,
    }])
  })

  it('should handle UPDATE_PLACE, it finds old place and updates with new place', () => {
    const initialState = [{
      place: 'old',
      id: 'id',
      location: 'location',
      infoWindow: false,
    },
    {
      place: 'another',
      id: 'anotherId',
      location: 'anotherLocation',
    }]

    const action = {
      type: 'UPDATE_PLACE',
      place: {
        place: 'old',
        id: 'id',
        location: 'location',
        infoWindow: false,
      },
      newPlace: {
        place:'newPlace',
        id:'newId',
        location: 'newLoc',
      }
    }
    const expectedState = [{
      place: 'newPlace',
      id: 'newId',
      location: 'newLoc',
      infoWindow: false,
    },
    {
      place: 'another',
      id: 'anotherId',
      location: 'anotherLocation',
    }]

    expect(getPlaces(initialState,action))
    .toEqual(expectedState)
  })
})
