import { combineReducers } from "redux";
import modalControl from "./modalReducer";
import authenticate from './authReducer'
import adminAlumni from './adminAlumniReducer'

export default combineReducers({
    modal: modalControl,
    auth: authenticate,
    admin_alumni: adminAlumni
})