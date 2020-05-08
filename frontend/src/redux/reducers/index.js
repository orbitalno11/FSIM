import { combineReducers } from "redux";
import modalControl from "./modalReducer";
import authenticate from './authReducer'
import adminAlumni from './adminAlumniReducer'

import general from './generalReducer'

export default combineReducers({
    website: general,
    modal: modalControl,
    auth: authenticate,
    admin_alumni: adminAlumni
})