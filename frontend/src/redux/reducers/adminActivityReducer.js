import * as types from '../types'

let year = new Date()
year = year.getFullYear() + 543

const initialState = {
    activityData: null,
    arData: null,
    activityList: null,
    activityListByYear: null,
    projectList: null,
    yearList: null,
    selectedYear: year,
    actionResult: null,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET_ACTIVITY_SELECTED_YEAR:
            return {
                ...state,
                selectedYear: action.year
            }

        case types.LOAD_ACTIVITY_DATA_START:
            return {
                ...state
            }

        case types.LOAD_ACTIVITY_DATA_SUCCESS:
            return {
                ...state,
                activityData: action.activityData
            }

        case types.LOAD_ACTIVITY_DATA_FAILED:
            return {
                ...state,
                activityData: null,
                error: action.error
            }

        case types.LOAD_AR_DATA_START:
            return {
                ...state
            }

        case types.LOAD_AR_DATA_SUCCESS:
            return {
                ...state,
                arData: action.arData
            }

        case types.LOAD_AR_DATA_FAILED:
            return {
                ...state,
                arData: null,
                error: action.error
            }

        case types.LOAD_ACTIVITY_LIST_START:
            return {
                ...state
            }

        case types.LOAD_ACTIVITY_LIST_SUCCESS:
            return {
                ...state,
                activityList: action.activityList
            }

        case types.LOAD_ACTIVITY_LIST_FAILED:
            return {
                ...state,
                activityList: null,
                error: action.error
            }

        case types.LOAD_PROJECT_LIST_START:
            return {
                ...state
            }

        case types.LOAD_PROJECT_LIST_SUCCESS:
            return {
                ...state,
                projectList: action.projectList
            }

        case types.LOAD_PROJECT_LIST_FAILED:
            return {
                ...state,
                arData: null,
                projectList: null,
                error: action.error
            }

        case types.ADD_PROJECT_START:
            return {
                ...state
            }

        case types.ADD_PROJECT_SUCCESS:
            return {
                ...state,
                actionResult: action.actionResult
            }

        case types.ADD_PROJECT_FAILED:
            return {
                ...state,
                actionResult: action.actionResult,
                error: action.error
            }

        case types.GET_ACTIVITY_YEAR_LIST_START:
            return {
                ...state
            }

        case types.GET_ACTIVITY_YEAR_LIST_SUCCESS:
            return {
                ...state,
                yearList: action.yearList
            }

        case types.GET_ACTIVITY_YEAR_LIST_FAILED:
            return {
                ...state,
                yearList: null,
                error: action.error
            }

        case types.UPLOAD_ACTIVITY_PARTICIPANT_START:
            return {
                ...state
            }

        case types.UPLOAD_ACTIVITY_PARTICIPANT_SUCCESS:
            return {
                ...state,
                actionResult: action.actionResult
            }

        case types.UPLOAD_ACTIVITY_PARTICIPANT_FAILED:
            return {
                ...state,
                actionResult: action.actionResult,
                error: action.error
            }

        default: return state
    }
}