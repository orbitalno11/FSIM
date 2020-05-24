import {
    START_LOADING,
    STOP_LOADING,
    GET_BRANCH_STARTED,
    GET_BRANCH_LIST_SUCCESS,
    GET_BRANCH_LIST_FAILED
} from '../types'

const initialState = {
    loading: true,
    branchList: null,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case START_LOADING:
            return {
                ...state,
                loading: action.loading
            }

        case STOP_LOADING:
            return {
                ...state,
                loading: action.loading
            }

        case GET_BRANCH_STARTED:
            return {
                ...state
            }

        case GET_BRANCH_LIST_SUCCESS:
            return {
                ...state,
                branchList: action.branchList
            }

        case GET_BRANCH_LIST_FAILED:
            return {
                ...state,
                error: action.error
            }

        default:
            return state
    }
}