import * as types from '../types'

const initialState = {
    userType: null,
    userName: null,
    authenticated: false,
    error: null,
    loading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_STARTED:
            return {
                ...state,
                loading: true
            }

        case types.LOGIN_SUCCESS:
            return {
                ...state,
                authenticated: true,
                error: null,
                loading: false
            }

        case types.LOGIN_FAILED:
            return {
                ...state,
                authenticated: false,
                userName: null,
                userType: null,
                error: action.error,
                loading: false
            }

        case types.GET_USER_DATA:
            return {
                ...state,
                userName: action.userName,
                userType: action.userType
            }

        case types.LOGOUT:
            return initialState

        default:
            return state
    }
}