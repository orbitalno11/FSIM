import * as types from '../types'

import { startLoading, stopLoading } from './generalAction'
import { openModal } from './modalAction'

import axios from 'axios'

// set select year
const setSelectedYear = year => (
    {
        type: types.SET_STUDENT_SELECTED_YEAR,
        year: year
    }
)

// Load Student 
const loadStudentstart = () => (
    {
        type: types.LOAD_STUDENT_DATA_START
    }
)

const loadStudentSuccess = (studentData) => (
    {
        type: types.LOAD_STUDENT_DATA_SUCCESS,
        studentData: studentData
    }
)

const loadStudentFailed = (error) => (
    {
        type: types.LOAD_STUDENT_DATA_FAILED,
        error: error
    }
)

// student List 
const loadStudentListStart = () => (
    {
        type: types.LOAD_STUDENT_LIST_START
    }
)

const loadStudentListSuccess = (list) => (
    {
        type: types.LOAD_STUDENT_LIST_SUCCESS,
        studentList: list
    }
)

const loadStudentListFailed = (error) => (
    {
        type: types.LOAD_STUDENT_LIST_FAILED,
        error: error
    }
)

// add student
const addStudentStart = () => (
    {
        type: types.ADD_STUDENT_START
    }
)

const addStudentSuccess = (result) => (
    {
        type: types.ADD_STUDENT_SUCCESS,
        actionResult: result
    }
)

const addStudentFailed = (error, result) => (
    {
        type: types.ADD_STUDENT_FAILED,
        actionResult: result,
        error: error
    }
)

//delete student 
const deleteStudentStart = () => (
    {
        type: types.DELETE_STUDENT_START
    }
)

const deleteStudentSuccess = (result) => (
    {
        type: types.DELETE_STUDENT_SUCCESS,
        actionResult: result
    }
)

const deleteStudentFailed = (error, result) => (
    {
        type: types.DELETE_STUDENT_FAILED,
        actionResult: result,
        error: error
    }
)

export const selectYear = year => dispatch => {
    dispatch(setSelectedYear(year))
}

export const getStudentData = dept_id => dispatch => {
    dispatch(startLoading())
    dispatch(loadStudentstart())

    let studentData = {}

    axios.get(`/student/department?dept_id=${dept_id}`)
        .then(res => {
            let data = res.data.data

            if (Object.keys(data) < 1) {
                dispatch(loadStudentFailed("Can not find data"))
                dispatch(stopLoading())
                return
            }

            let department = data['dept_name']
            let branch = data['branch'][0]
            let byYear = data['status_by_year'][0]
            let byBranch = data['df_status_by_branch'][0]
            let dept_id = dept_id

            studentData = {
                department: department,
                branch: branch,
                byYear: byYear,
                byBranch: byBranch,
                dept_id: dept_id
            }

            dispatch(loadStudentSuccess(studentData))
            dispatch(stopLoading())
        })
        .catch(err => {
            dispatch(loadStudentFailed(err))
            dispatch(stopLoading())
        })
    }

    export const getStudentList = year => dispatch => {
        dispatch(startLoading())
        dispatch(loadStudentListStart())

        axios.get(`/admin/student/list/year=${year}`)
            .then(res => {
                let data = res.data.data

                if (Object.keys(data) < 1) {
                    dispatch(loadStudentListFailed("Can not find data"))
                    dispatch(stopLoading())
                    return
                }

                dispatch(loadStudentListSuccess(data))
                dispatch(stopLoading())
            })
            .catch(err => {
                dispatch(loadStudentListFailed(err))
                dispatch(stopLoading())
            })
    }

    
// export const getYearList = () => (dispatch) => {
//     dispatch(loadActivityYearListStart())
//     dispatch(startLoading())
//     axios.get('/activity/year/list')
//         .then(res => {
//             let data = res.data.data

//             let cur_year = new Date()
//             cur_year = cur_year.getFullYear() + 543

//             if (!data.includes(cur_year))
//                 data.push(cur_year)
            
//             data.sort((prev, cur) => (cur - prev))

//             dispatch(loadActivityYearListSuccess(data))
//             dispatch(stopLoading())
//         })
//         .catch(err => {
//             console.error(err)
//             dispatch(loadActivityYearListFalied())
//             dispatch(stopLoading())
//         })
// }


    // export const deleteStudent = student_id
    
