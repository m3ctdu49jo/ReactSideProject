import { combineReducers } from "redux";
import GridReducer from "./GridReducer";

const rootReducer = combineReducers({
    "grid": GridReducer
});

export default rootReducer;