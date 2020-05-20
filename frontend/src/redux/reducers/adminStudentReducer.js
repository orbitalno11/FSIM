import * as types from '../types'

let year = new Date()
year = year.getFullYear() + 543

const initialState = {
    studentData: null,
    studentList: null,
    departmentList: null,
    educationList: null,
    yearList: null,
    selectedYear: 2560,
    actionResult: null,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET_STUDENT_SELECTED_YEAR:
            return {
                ...state,
                selectedYear: action.year
            }
        case types.LOAD_STUDENT_DATA_START:
            return {
                ...state
            }
        case types.LOAD_STUDENT_DATA_SUCCESS:
            return {
                ...state,
                studentData: action.studentData
            }
        case types.LOAD_STUDENT_DATA_FAILED:
            return {
                ...state,
                studentData: null,
                error: action.error
            }
        case types.LOAD_STUDENT_LIST_START:
            return {
                ...state
            }
        case types.LOAD_STUDENT_LIST_SUCCESS:
            return {
                ...state,
                studentList: action.studentList
            }
        case types.LOAD_STUDENT_LIST_FAILED:
            return {
                ...state,
                studentList: null,
                error: action.error
            }
        case types.LOAD_DEPT_LIST_START:
            return {
                ...state
            }
        case types.LOAD_DEPT_LIST_SUCCESS:
            return {
                ...state,
                departmentList: action.departmentList
            }
        case types.LOAD_DEPT_LIST_FAILED:
            return {
                ...state,
                departmentList: null,
                error: action.error
            }
        case types.LOAD_EDUCATION_LIST_START:
            return {
                ...state
            }
        case types.LOAD_EDUCATION_LIST_SUCCESS:
            return {
                ...state,
                educationList: action.educationList
            }
        case types.LOAD_EDUCATION_LIST_FAILED:
            return {
                ...state,
                educationList: null,
                error: action.error
            }
        case types.ADD_STUDENT_START:
            return {
                ...state
            }
        case types.ADD_STUDENT_SUCCESS:
            return {
                ...state,
                actionResult: action.actionResult
            }
        case types.ADD_STUDENT_FAILED:
            return {
                ...state,
                actionResult: action.actionResult,
                error: action.error
            }
        case types.GET_STUDENT_YEAR_LIST_START:
            return {
                ...state
            }
        case types.GET_STUDENT_YEAR_LIST_SUCCESS:
            return {
                ...state,
                yearList: action.yearList
            }
        case types.GET_STUDENT_YEAR_LIST_FAILED:
            return {
                ...state,
                yearList: null,
                error: action.error
            }
        default: return state
    }
}