import { createStore } from "redux";
import questionsReducer from "./questionsReducer";

const store = createStore(questionsReducer)

export default store