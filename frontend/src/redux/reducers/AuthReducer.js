import * as types from '../types'

const initialState = {
    userType: "admin",
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
                error: null
            }

        case types.LOGIN_FAILED:
            return {
                ...state,
                loading: false,
                token: null,
                userType: null,
                error: action.error
            }

        default:
            return state
    }
}