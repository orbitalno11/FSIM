import { START_LOADING, STOP_LOADING } from '../types'

const initialState = {
    loading: true
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

        default:
            return state
    }
}