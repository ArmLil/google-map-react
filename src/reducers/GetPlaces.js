export const getPlaces = (state = [], action) => {
  switch (action.type) {
    case "ADD_PLACE":
      return [
        ...state,
        {
          name: action.name,
          location: action.location,
          id: action.id,
          infoWindow: false
        }
      ];
      break;
    case "REMOVE_PLACE":
      console.log({ action });
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ];

      break;
    //is used for showing infoWindow and dragging the marker
    case "UPDATE_PLACE":
      const { place, newPlace } = action;
      return state.map(elem => {
        if (elem.id == place.id) {
          const newObj = Object.assign({}, place, newPlace);
          return newObj;
        }
        return elem;
      });
      break;
    //this is used after reordering
    case "UPDATE_PLACES_ARRAY":
      return action.placesArray;
    default:
      return state;
  }
};
