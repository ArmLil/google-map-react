import { combineReducers } from "redux";
import { getPlaces } from "./GetPlaces";
import { getCenter } from "./GetCenter";

const reducers = combineReducers({ getPlaces, getCenter });

export default reducers;
