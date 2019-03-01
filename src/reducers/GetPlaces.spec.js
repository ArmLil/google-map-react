import { getPlaces } from "./GetPlaces.js";

describe("getPlaces reducer", () => {
  it("should handle initial state", () => {
    expect(getPlaces(undefined, {})).toEqual([]);
  });

  it("should handle ADD_PLACE", () => {
    expect(
      getPlaces([], {
        type: "ADD_PLACE",
        name: "My Place",
        location: { lat: "lat", lng: "lng" },
        id: "anyId"
      })
    ).toEqual([
      {
        name: "My Place",
        location: { lat: "lat", lng: "lng" },
        id: "anyId",
        infoWindow: false
      }
    ]);
  });

  it("should handle REMOVE_PLACE", () => {
    const initialState = [
      {
        place: "My Place",
        index: 0
      },
      {
        place: "Removable Place",
        index: 1
      }
    ];

    const action = {
      type: "REMOVE_PLACE",
      index: 1
    };

    const expectedState = [
      {
        place: "My Place",
        index: 0
      }
    ];

    expect(getPlaces(initialState, action)).toEqual(expectedState);
  });

  it("should handle UPDATE_PLACE, it finds old place and updates with new place", () => {
    const initialState = [
      {
        name: "old",
        id: "id",
        location: "location",
        infoWindow: false
      },
      {
        name: "another",
        id: "anotherId",
        location: "anotherLocation"
      }
    ];

    const action = {
      type: "UPDATE_PLACE",
      place: {
        name: "old",
        id: "id",
        location: "location",
        infoWindow: false
      },
      newPlace: {
        name: "newPlace",
        id: "newId",
        location: "newLoc"
      }
    };
    const expectedState = [
      {
        name: "newPlace",
        id: "newId",
        location: "newLoc",
        infoWindow: false
      },
      {
        name: "another",
        id: "anotherId",
        location: "anotherLocation"
      }
    ];

    expect(getPlaces(initialState, action)).toEqual(expectedState);
  });
});
