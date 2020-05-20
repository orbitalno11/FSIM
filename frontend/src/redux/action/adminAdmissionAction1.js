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

const loaAdmissionListSuccess = (list) => (
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

//admission year list
const loadAdmissionYearListStart = () => (
    {
        type: types.GET_ADMISSION_YEAR_LIST_START
    }
)

const loadAdmissionYearListSuccess = (list) => (
    {
        type: types.GET_ADMISSION_YEAR_LIST_SUCCESS,
        yearList: list
    }
)

const loadAdmissionYearListFalied = (error) => (
    {
        type: types.GET_ADMISSION_YEAR_LIST_FAILED,
        error: error
    }
)

export const selectYear = year => dispatch => {
    dispatch(setSelectedYear(year))
}

export const getAdmissionList = () => dispatch => {
    dispatch(startLoading())
    dispatch(loadAdmissionListStart())

    axios.get(`/admission/analyze`)
        .then(res => {
            let recieved_data = res.data.data

            if (Object.keys(recieved_data) < 1) {
                dispatch(loadAdmissionListFalied("Can not find data"))
                dispatch(stopLoading())
                return
            }
            let branchData = recieved_data['count_by_branch']
            let workStatus = recieved_data['count_by_status']
           
            let data = {
                branchStudentChart: branchData,
                workChart: workStatus,
            }

            dispatch(loaAdmissionListSuccess(data))
            dispatch(stopLoading())
        })
        .catch(err => {
            dispatch(loadAdmissionListFalied(err))
            dispatch(stopLoading())
        })
}

