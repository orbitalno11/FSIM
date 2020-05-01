import { combineReducers } from "redux";
import modalControl from "./modalReducer";
import authenticate from './authReducer'

export default combineReducers({
    modal: modalControl,
    auth: authenticate
})