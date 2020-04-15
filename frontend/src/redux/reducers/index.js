import { combineReducers } from "redux";
import modalControl from "./modalReducer";
import branch from "./BranchReducer";
import department from './DeptReducer'
import authenticate from './AuthReducer'

export default combineReducers({
    modal: modalControl,
    branch: branch,
    department: department,
    auth: authenticate
})