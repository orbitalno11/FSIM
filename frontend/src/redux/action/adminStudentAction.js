import * as types from '../types'

import { startLoading, stopLoading } from './generalAction'
import { openModal } from './modalAction'

import axios from 'axios'

// set select year
// const setSelectedYear = year => (
//     {
//         type: types.SET_STUDENT_SELECTED_YEAR,
//         year: year
//     }
// )

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

// // department list
// const loadDepartmentListStart = () => (
//     {
//         type: types.LOAD_DEPT_LIST_START
//     }
// )

// const loadDepartmentListSuccess = (list) => (
//     {
//         type: types.LOAD_DEPT_LIST_SUCCESS,
//         departmentList: list
//     }
// )

// const loadDepartmentListFailed = (error) => (
//     {
//         type: types.LOAD_DEPT_LIST_FAILED,
//         error: error
//     }
// )

// load education
const loadEducationListStart = () => (
    {
        type: types.LOAD_EDUCATION_LIST_START
    }
)

const loadEducationListSuccess = (list) => (
    {
        type: types.LOAD_EDUCATION_LIST_SUCCESS,
        educationList: list
    }
)

const loadEducationListFailed = (error) => (
    {
        type: types.LOAD_EDUCATION_LIST_FAILED,
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

// add gpax student
const addGpaxStudentStart = () => (
    {
        type: types.ADD_GPAX_STUDENT_START
    }
)

const addGpaxStudentSuccess = (result) => (
    {
        type: types.ADD_GPAX_STUDENT_SUCCESS,
        actionResult: result
    }
)

const addGpaxStudentFailed = (error, result) => (
    {
        type: types.ADD_GPAX_STUDENT_FAILED,
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


// const loadStudentYearListSuccess = (list) => (
//     {
//         type: types.GET_STUDENT_YEAR_LIST_SUCCESS,
//         yearList: list
//     }
// )

// const loadStudentYearListFailed = (list) => (
//     {
//         type: types.GET_STUDENT_YEAR_LIST_FAILED,
//         yearList: list
//     }
// )



///กราฟ
export const getStudentData = () => dispatch => {
    dispatch(startLoading())
    dispatch(loadStudentstart())

    let studentData = {}

    axios.get(`/admin/student/analyze`)
        .then(res => {
            let data = res.data.data

            if (Object.keys(data) < 1) {
                dispatch(loadStudentFailed("Can not find data"))
                dispatch(stopLoading())
                return
            }

            dispatch(loadStudentSuccess(data))
            dispatch(stopLoading())
        })
        .catch(err => {
            dispatch(loadStudentFailed(err))
            dispatch(stopLoading())
        })
}


///หน้า student tracking
export const getStudentList = () => dispatch => {
    dispatch(startLoading())
    dispatch(loadStudentListStart())

    axios.get(`/admin/student/list?year=2560`)
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

///หน้า student manage
export const getEducationList = () => dispatch => {
    dispatch(startLoading())
    dispatch(loadEducationListStart())

    axios.get('/admin/student/education/list')
        .then(res => {
            let data = res.data.data

            dispatch(loadEducationListSuccess(data))
          
            
            dispatch(stopLoading())
        })
        .catch(err => {
            console.error(err)
            dispatch(loadEducationListFailed(err))
            dispatch(stopLoading())
        })
}

//เพิ่มนศ.
export const addStudent = data => dispatch => {
    dispatch(startLoading())
    dispatch(addStudentStart())
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    axios.post('/admin/student', data,config)
        .then(res => {
            dispatch(addStudentSuccess(true))
            dispatch(stopLoading())
            dispatch(openModal(true, [{ text: 'บันทึกสำเร็จ', color: '#33cc33', type: true }]))

        })
        .catch(err => {
            console.error(err)
            dispatch(openModal(true, [{ text: 'บันทึกล้มเหลว กรุณาตรวจสอบการบันทึกอีกครั้ง', color: '#C0392B', type: false }]))
            dispatch(addStudentFailed(err, false))
            dispatch(stopLoading())
        })
}

//เพิ่มเกรด
export const addStudentGpax = data => dispatch => {
    dispatch(addGpaxStudentStart())
    dispatch(startLoading())
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    axios.post('/admin/student/academic', data,config)
        .then(res => {
            dispatch(addGpaxStudentSuccess(true))
            dispatch(stopLoading())
            dispatch(openModal(true, [{ text: 'บันทึกสำเร็จ', color: '#33cc33', type: true }]))

        })
        .catch(err => {
            console.error(err)
            dispatch(openModal(true, [{ text: 'บันทึกล้มเหลว กรุณาตรวจสอบการบันทึกอีกครั้ง', color: '#C0392B', type: false }]))
            dispatch(addGpaxStudentFailed(err, false))
            dispatch(stopLoading())
        })
}


export const deleteEducation = data => dispatch => {
    dispatch(startLoading())
    dispatch(deleteStudentStart())

    axios.delete(`/admin/student/?key${data.id}`)
        .then(res => {
            let data = res.data
            if (data['response']) {
                dispatch(deleteStudentSuccess())
                dispatch(getEducationList())
                dispatch(openModal(true, [{ text: 'บันทึกสำเร็จ', color: '#33cc33', type: true }]))
            }
            else {
                dispatch(deleteStudentFailed("Response Error"))
                dispatch(openModal(true, [{ text: 'บันทึกล้มเหลว กรุณาตรวจสอบการบันทึกอีกครั้ง', color: '#C0392B', type: false }]))

            }

            dispatch(stopLoading())
        })
        .catch(err => {
            console.error(err)
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

