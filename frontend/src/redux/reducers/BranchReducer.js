import { GET_BRANCH_STARTED, GET_BRANCH_SUCCESS, GET_BRANCH_FAILED } from "../types";

const initialState = {
    branch: null,
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_BRANCH_STARTED:
            return {
                ...state,
                loading: true
            }

        case GET_BRANCH_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                branch: action.branch
            }

        case GET_BRANCH_FAILED:
            return {
                ...state,
                loading: false,
                error: action.branch
            }

        default:
            return state
    }
}