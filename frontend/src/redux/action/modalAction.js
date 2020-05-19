import {OPEN_MODAL, CLOSE_MODAL} from '../types'

export const openModal = (modalOpen= true, modalProps) => ({
    type: OPEN_MODAL,
    modalOpen,
    modalProps
})

export const closeModal = (modalOpen = false) => ({
    type: CLOSE_MODAL,
    modalOpen
})