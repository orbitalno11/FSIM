import * as types from '../types'

const initialState = {
    userType: "admin",
    userName: "FSIM Admin",
    token: null,
    error: null,
    loading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_STARTED:
            return{
                ...state,
                loading: true
            }

        case types.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.token,
                userType: action.userType,
                userName: action.userName,
                error: null
            }

        case types.LOGIN_FAILED:
            return {
                ...state,
                loading: false,
                token: null,
                userType: null,
                userName: null,
                error: action.error
            }

        default:
            return state
    }
}