import { combineReducers } from "redux";
import modalControl from "./modalReducer";
import branch from "./BranchReducer";

export default combineReducers({
    modal: modalControl,
    branch: branch
})