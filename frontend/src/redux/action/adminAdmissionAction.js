import * as types from '../types'

import { startLoading, stopLoading } from './generalAction'
import { openModal } from './modalAction'

import axios from 'axios'

// set select year
const setSelectedYear = year => (
    {
        type: types.SET_ADMISSION_SELECTED_YEAR,
        year: year
    }
)

// admission list
const loadAdmissionListStart = () => (
    {
        type: types.LOAD_ADMISSION_LIST_START
    }
)

const loadAdmissionListSuccess = (list) => (
    {
        type: types.LOAD_ADMISSION_LIST_SUCCESS,
        admissionList: list
    }
)

const loadAdmissionListFalied = (error) => (
    {
        type: types.LOAD_ADMISSION_LIST_FAILED,
        error: error
    }
)

// delete admission
const deleteAdmissionStart = () => (
    {
        type: types.DELETE_ADMISSION_START
    }
)

const deleteAdmissionSuccess = (result) => (
    {
        type: types.DELETE_ADMISSION_SUCCESS,
        actionResult: result
    }
)

const deleteAdmissionFalied = (error, result) => (
    {
        type: types.DELETE_ADMISSION_FAILED,
        actionResult: result,
        error: error
    }
)

// add admission
const addAdmissionStart = () => (
    {
        type: types.ADD_ADMISSION_START
    }
)

const addAdmissionSuccess = (result) => (
    {
        type: types.ADD_ADMISSION_SUCCESS,
        actionResult: result
    }
)

const addAdmissionFalied = (error, result) => (
    {
        type: types.ADD_ADMISSION_FAILED,
        actionResult: result,
        error: error
    }
)

// //admission year list
// const loadAdmissionYearListStart = () => (
//     {
//         type: types.GET_ADMISSION_YEAR_LIST_START
//     }
// )

// const loadAdmissionYearListSuccess = (list) => (
//     {
//         type: types.GET_ADMISSION_YEAR_LIST_SUCCESS,
//         yearList: list
//     }
// )

// const loadAdmissionYearListFalied = (error) => (
//     {
//         type: types.GET_ADMISSION_YEAR_LIST_FAILED,
//         error: error
//     }
// )

export const selectYear = year => dispatch => {
    dispatch(setSelectedYear(year))
}

export const getAdmissionList = () => dispatch => {
    dispatch(startLoading())
    dispatch(loadAdmissionListStart())

    axios.get(`/admin/admission/list`)
        .then(res => {
            let data = res.data.data

            if (Object.keys(data) < 1) {
                dispatch(loadAdmissionListFalied("Can not find data"))
                dispatch(stopLoading())
                return
            }

            dispatch(loadAdmissionListSuccess(data))
            dispatch(stopLoading())
        })
        .catch(err => {
            dispatch(loadAdmissionListFalied(err))
            dispatch(stopLoading())
        })
}

export const deleteAdmission = (year,round_id,channel_id) => (dispatch, getState) => {
    dispatch(deleteAdmissionStart())
    dispatch(startLoading())
    axios.delete(`/admin/admission?year=${year}&round_id=${round_id}&channel_id=${channel_id}`)
        .then(res => {
            dispatch(deleteAdmissionSuccess(true))
            dispatch(stopLoading())
            let year = getState().admin_admission.selectedYear
            dispatch(getAdmissionList(year))
            // dispatch(getAdmissionData(year))
            dispatch(openModal(true, [{ text: 'บันทึกสำเร็จ', color: '#33cc33', type: true }]))
        })
        .catch(err => {
            dispatch(openModal(true, [{ text: 'บันทึกล้มเหลว กรุณาตรวจสอบการบันทึกอีกครั้ง', color: '#C0392B', type: false }]))
            dispatch(deleteAdmissionFalied(err, false))
            dispatch(stopLoading())
        })
}

export const addAdmission = (year,channel)=> (dispatch, getState) => {
    dispatch(addAdmissionStart())
    dispatch(startLoading())
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    axios.post('/admin/admission/?year=${year}&channel=${channel}')
        .then(res => {
            dispatch(addAdmissionSuccess(true))
            dispatch(stopLoading())
            let year = getState().admin_admission.selectedYear
            dispatch(getAdmissionList(year))
            //dispatch(getActivityData(year))
            dispatch(openModal(true, [{ text: 'บันทึกสำเร็จ', color: '#33cc33', type: true }]))
        })
        .catch(err => {
            console.error(err)
            dispatch(openModal(true, [{ text: 'บันทึกล้มเหลว กรุณาตรวจสอบการบันทึกอีกครั้ง', color: '#C0392B', type: false }]))
            dispatch(addAdmissionFalied(err, false))
            dispatch(stopLoading())
        })
}

