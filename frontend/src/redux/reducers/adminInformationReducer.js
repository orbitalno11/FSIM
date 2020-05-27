import * as types from '../types'

const initialState = {
    courseList: null,
    courseData: null,
    departmentList: null,
    erro: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_COURSE_LIST_START:
            return {
                ...state
            }

        case types.GET_COURSE_LIST_SUCCESS:
            return {
                ...state,
                courseList: action.courseList,
                error: null
            }

        case types.GET_COURSE_LIST_FAILED:
            return {
                ...state,
                error: action.error
            }

        case types.GET_COURSE_DATA_START:
            return {
                ...state
            }

        case types.GET_COURSE_DATA_SUCCESS:
            return {
                ...state,
                courseData: action.courseData,
                error: null
            }

        case types.GET_COURSE_DATA_FAILED:
            return {
                ...state,
                error: action.error
            }

        case types.GET_DEPT_STARTED:
            return {
                ...state
            }

        case types.GET_DEPT_LIST_SUCCESS:
            return {
                ...state,
                departmentList: action.deptList
            }

        case types.GET_DEPT_LIST_FAILED:
            return {
                ...state,
                error: action.error
            }

        default: return state
    }
}