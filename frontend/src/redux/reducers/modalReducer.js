import { OPEN_MODAL, CLOSE_MODAL } from '../types'

const initialState = {
    modalOpen: false,
    // modalID: null
    modalProps :[]
}

export default (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MODAL: {
            return {
                // ...state,
                modalOpen: action.modalOpen,
                // modalID: action.modalID
                modalProps : action.modalProps
            }
        }

        case CLOSE_MODAL: {
            return {
                // ...state,
                modalOpen: action.modalOpen,
                modalProps : []
                // // modalID: null
                // modalType
                // initialState
            }
        }

        default:
            return state
    }
}